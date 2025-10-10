import { DataCategory, DataEntry, ValidationResult, DataTemplate } from '../types/dataInput';
import { AuthUser } from '../middleware/auth';

class DataInputService {
  // Define available data categories and their schemas
  private categories: Record<string, DataTemplate> = {
    'platform-kpis': {
      name: 'Platform KPIs',
      description: 'Key performance indicators for platform metrics',
      schema: {
        date: { type: 'date', required: true, label: 'Date' },
        platform: { type: 'select', required: true, label: 'Platform', options: ['Android', 'iOS', 'Web', 'TV'] },
        dau: { type: 'number', required: true, label: 'Daily Active Users' },
        retention: { type: 'number', required: true, label: 'Retention Rate (%)' },
        crashRate: { type: 'number', required: false, label: 'Crash Rate (%)' },
        loadTime: { type: 'number', required: false, label: 'Average Load Time (ms)' }
      },
      permissions: ['admin', 'pm', 'tpm']
    },
    'business-kpis': {
      name: 'Business KPIs',
      description: 'Business performance metrics',
      schema: {
        date: { type: 'date', required: true, label: 'Date' },
        revenue: { type: 'number', required: true, label: 'Revenue ($)' },
        transactions: { type: 'number', required: true, label: 'Transactions' },
        churnRate: { type: 'number', required: false, label: 'Churn Rate (%)' },
        ltv: { type: 'number', required: false, label: 'Customer LTV ($)' }
      },
      permissions: ['admin', 'executive']
    },
    'bug-data': {
      name: 'Bug Reports',
      description: 'Bug tracking and resolution data',
      schema: {
        id: { type: 'string', required: true, label: 'Bug ID' },
        title: { type: 'string', required: true, label: 'Title' },
        severity: { type: 'select', required: true, label: 'Severity', options: ['Critical', 'High', 'Medium', 'Low'] },
        status: { type: 'select', required: true, label: 'Status', options: ['Open', 'In Progress', 'Resolved', 'Closed'] },
        reportedDate: { type: 'date', required: true, label: 'Reported Date' },
        resolvedDate: { type: 'date', required: false, label: 'Resolved Date' },
        assignee: { type: 'string', required: false, label: 'Assignee' }
      },
      permissions: ['admin', 'em', 'tpm']
    },
    'sprint-data': {
      name: 'Sprint Data',
      description: 'Sprint planning and execution metrics',
      schema: {
        sprintName: { type: 'string', required: true, label: 'Sprint Name' },
        startDate: { type: 'date', required: true, label: 'Start Date' },
        endDate: { type: 'date', required: true, label: 'End Date' },
        committedPoints: { type: 'number', required: true, label: 'Committed Story Points' },
        completedPoints: { type: 'number', required: true, label: 'Completed Story Points' },
        teamSize: { type: 'number', required: true, label: 'Team Size' }
      },
      permissions: ['admin', 'em', 'tpm']
    },
    'performance-data': {
      name: 'Performance Metrics',
      description: 'System performance and reliability data',
      schema: {
        timestamp: { type: 'datetime', required: true, label: 'Timestamp' },
        service: { type: 'string', required: true, label: 'Service Name' },
        responseTime: { type: 'number', required: true, label: 'Response Time (ms)' },
        throughput: { type: 'number', required: true, label: 'Throughput (req/sec)' },
        errorRate: { type: 'number', required: false, label: 'Error Rate (%)' },
        cpuUsage: { type: 'number', required: false, label: 'CPU Usage (%)' },
        memoryUsage: { type: 'number', required: false, label: 'Memory Usage (%)' }
      },
      permissions: ['admin', 'sre', 'tpm']
    },
    'content-performance': {
      name: 'Content Performance',
      description: 'Content consumption and engagement metrics',
      schema: {
        date: { type: 'date', required: true, label: 'Date' },
        contentId: { type: 'string', required: true, label: 'Content ID' },
        contentType: { type: 'select', required: true, label: 'Content Type', options: ['Movie', 'Series', 'Live', 'Short'] },
        views: { type: 'number', required: true, label: 'Views' },
        watchTime: { type: 'number', required: true, label: 'Watch Time (minutes)' },
        completionRate: { type: 'number', required: false, label: 'Completion Rate (%)' },
        avgRating: { type: 'number', required: false, label: 'Average Rating' }
      },
      permissions: ['admin', 'pm', 'cms']
    },
    'risk-data': {
      name: 'Risk Assessment',
      description: 'Project and operational risks',
      schema: {
        id: { type: 'string', required: true, label: 'Risk ID' },
        description: { type: 'text', required: true, label: 'Description' },
        category: { type: 'select', required: true, label: 'Category', options: ['Technical', 'Business', 'Operational', 'Security'] },
        probability: { type: 'select', required: true, label: 'Probability', options: ['Low', 'Medium', 'High', 'Critical'] },
        impact: { type: 'select', required: true, label: 'Impact', options: ['Low', 'Medium', 'High', 'Critical'] },
        mitigation: { type: 'text', required: false, label: 'Mitigation Plan' },
        owner: { type: 'string', required: true, label: 'Risk Owner' }
      },
      permissions: ['admin', 'executive', 'tpm']
    },
    'infrastructure-data': {
      name: 'Infrastructure Metrics',
      description: 'Infrastructure utilization and capacity data',
      schema: {
        timestamp: { type: 'datetime', required: true, label: 'Timestamp' },
        resource: { type: 'string', required: true, label: 'Resource Type' },
        utilization: { type: 'number', required: true, label: 'Utilization (%)' },
        capacity: { type: 'number', required: true, label: 'Total Capacity' },
        cost: { type: 'number', required: false, label: 'Cost ($)' },
        region: { type: 'string', required: true, label: 'Region' }
      },
      permissions: ['admin', 'sre']
    }
  };

  // In-memory storage for submissions (in production, use database)
  private submissions: DataEntry[] = [];

  async submitFormData(category: string, data: any, user: AuthUser): Promise<ValidationResult> {
    // Validate category access
    if (!this.canAccessCategory(category, user)) {
      throw new Error('Access denied to this data category');
    }

    // Validate data
    const validation = await this.validateData(category, data, user);
    if (!validation.valid) {
      return validation;
    }

    // Create submission
    const submission: DataEntry = {
      id: this.generateId(),
      category,
      data,
      submittedBy: user.id,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      source: 'form'
    };

    this.submissions.push(submission);

    return {
      valid: true,
      message: 'Data submitted successfully',
      submissionId: submission.id
    };
  }

  async uploadCSVDataFromText(category: string, csvText: string, user: AuthUser): Promise<ValidationResult> {
    // Validate category access
    if (!this.canAccessCategory(category, user)) {
      throw new Error('Access denied to this data category');
    }

    // Parse CSV
    const csvData = await this.parseCSV(csvText);

    // Validate each row
    const validations: ValidationResult[] = [];
    for (const row of csvData) {
      const validation = await this.validateData(category, row, user);
      validations.push(validation);
    }

    const validRows = validations.filter(v => v.valid).length;
    const invalidRows = validations.filter(v => !v.valid);

    if (invalidRows.length > 0) {
      return {
        valid: false,
        message: `${invalidRows.length} rows failed validation. First error: ${invalidRows[0].message}`,
        errors: invalidRows.flatMap(v => v.errors || [])
      };
    }

    // Create submissions for valid data
    const submissions: DataEntry[] = csvData.map(row => ({
      id: this.generateId(),
      category,
      data: row,
      submittedBy: user.id,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      source: 'csv'
    }));

    this.submissions.push(...submissions);

    return {
      valid: true,
      message: `Successfully uploaded ${validRows} rows`,
      submissionIds: submissions.map(s => s.id)
    };
  }

  async validateData(category: string, data: any, user: AuthUser): Promise<ValidationResult> {
    const template = this.categories[category];
    if (!template) {
      return {
        valid: false,
        message: 'Invalid category',
        errors: ['Category does not exist']
      };
    }

    const errors: string[] = [];

    // Check required fields
    for (const [field, config] of Object.entries(template.schema)) {
      const fieldConfig = config as any;
      if (fieldConfig.required && (data[field] === undefined || data[field] === null || data[field] === '')) {
        errors.push(`${fieldConfig.label} is required`);
      }

      // Type validation
      if (data[field] !== undefined && data[field] !== null && data[field] !== '') {
        switch (fieldConfig.type) {
          case 'number':
            if (isNaN(Number(data[field]))) {
              errors.push(`${fieldConfig.label} must be a number`);
            }
            break;
          case 'date':
            if (isNaN(Date.parse(data[field]))) {
              errors.push(`${fieldConfig.label} must be a valid date`);
            }
            break;
          case 'datetime':
            if (isNaN(Date.parse(data[field]))) {
              errors.push(`${fieldConfig.label} must be a valid date/time`);
            }
            break;
          case 'select':
            if (fieldConfig.options && !fieldConfig.options.includes(data[field])) {
              errors.push(`${fieldConfig.label} must be one of: ${fieldConfig.options.join(', ')}`);
            }
            break;
        }
      }
    }

    return {
      valid: errors.length === 0,
      message: errors.length === 0 ? 'Data is valid' : 'Validation failed',
      errors
    };
  }

  async getAvailableCategories(user: AuthUser): Promise<DataCategory[]> {
    return Object.entries(this.categories)
      .filter(([_, template]) => template.permissions.includes(user.role))
      .map(([key, template]) => ({
        id: key,
        name: template.name,
        description: template.description,
        permissions: template.permissions
      }));
  }

  async getDataTemplate(category: string, user: AuthUser): Promise<DataTemplate> {
    const template = this.categories[category];
    if (!template) {
      throw new Error('Category not found');
    }

    if (!template.permissions.includes(user.role)) {
      throw new Error('Access denied to this category');
    }

    return template;
  }

  async getRecentSubmissions(user: AuthUser, limit: number = 10): Promise<DataEntry[]> {
    return this.submissions
      .filter(submission => submission.submittedBy === user.id)
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, limit);
  }

  async getAllSubmissions(category: string, page: number = 1, limit: number = 50): Promise<{ submissions: DataEntry[]; total: number }> {
    const categorySubmissions = this.submissions.filter(s => s.category === category);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      submissions: categorySubmissions.slice(startIndex, endIndex),
      total: categorySubmissions.length
    };
  }

  async reviewSubmission(id: string, action: 'approve' | 'reject', reviewer: AuthUser, comments?: string): Promise<DataEntry> {
    const submission = this.submissions.find(s => s.id === id);
    if (!submission) {
      throw new Error('Submission not found');
    }

    submission.status = action === 'approve' ? 'approved' : 'rejected';
    submission.reviewedBy = reviewer.id;
    submission.reviewedAt = new Date().toISOString();
    submission.reviewComments = comments;

    return submission;
  }

  private canAccessCategory(category: string, user: AuthUser): boolean {
    const template = this.categories[category];
    return template && template.permissions.includes(user.role);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private async parseCSV(csvText: string): Promise<any[]> {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('CSV must have at least a header row and one data row');
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      if (values.length === headers.length) {
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });
        data.push(row);
      }
    }

    return data;
  }
}

export const dataInputService = new DataInputService();