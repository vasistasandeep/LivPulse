import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';

export interface ReportData {
  title: string;
  generatedAt: string;
  summary: any;
  platforms: any[];
  backend: any[];
  operations: any[];
  store: any[];
  cms: any[];
  risks: any[];
  recommendations: any[];
  kpis: any;
}

class PDFExportService {
  private templatePath = path.join(__dirname, '../templates');

  /**
   * Generate executive report PDF
   */
  async generateExecutiveReport(data: ReportData): Promise<Buffer> {
    try {
      // Create template if it doesn't exist
      await this.ensureTemplateExists();
      
      // Read and compile template
      const templateHtml = await fs.readFile(
        path.join(this.templatePath, 'executive-report.hbs'), 
        'utf-8'
      );
      const template = handlebars.compile(templateHtml);
      
      // Generate HTML with data
      const html = template(data);
      
      // Generate PDF using Puppeteer
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm'
        }
      });
      
      await browser.close();
      return pdfBuffer;
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw new Error('Failed to generate PDF report');
    }
  }

  /**
   * Generate detailed technical report PDF
   */
  async generateTechnicalReport(data: ReportData): Promise<Buffer> {
    try {
      await this.ensureTemplateExists();
      
      const templateHtml = await fs.readFile(
        path.join(this.templatePath, 'technical-report.hbs'), 
        'utf-8'
      );
      const template = handlebars.compile(templateHtml);
      
      const html = template(data);
      
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm'
        }
      });
      
      await browser.close();
      return pdfBuffer;
      
    } catch (error) {
      console.error('Technical PDF generation failed:', error);
      throw new Error('Failed to generate technical PDF report');
    }
  }

  /**
   * Ensure template directory and files exist
   */
  private async ensureTemplateExists(): Promise<void> {
    try {
      await fs.access(this.templatePath);
    } catch {
      await fs.mkdir(this.templatePath, { recursive: true });
    }

    // Create executive report template if it doesn't exist
    const executiveTemplatePath = path.join(this.templatePath, 'executive-report.hbs');
    try {
      await fs.access(executiveTemplatePath);
    } catch {
      await fs.writeFile(executiveTemplatePath, this.getExecutiveTemplate());
    }

    // Create technical report template if it doesn't exist
    const technicalTemplatePath = path.join(this.templatePath, 'technical-report.hbs');
    try {
      await fs.access(technicalTemplatePath);
    } catch {
      await fs.writeFile(technicalTemplatePath, this.getTechnicalTemplate());
    }
  }

  /**
   * Executive report HTML template
   */
  private getExecutiveTemplate(): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{title}}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            line-height: 1.6;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
            font-weight: 300;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
        }
        .content {
            padding: 30px;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .metric-card {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            border-radius: 8px;
        }
        .metric-value {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
        }
        .metric-label {
            color: #666;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .section {
            margin: 40px 0;
            page-break-inside: avoid;
        }
        .section h2 {
            color: #667eea;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        .health-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }
        .health-healthy { background-color: #28a745; }
        .health-warning { background-color: #ffc107; }
        .health-critical { background-color: #dc3545; }
        .platform-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }
        .platform-card {
            background: white;
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 15px;
        }
        .risk-item {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 10px 0;
            border-radius: 4px;
        }
        .risk-critical { border-left-color: #dc3545; background: #f8d7da; }
        .risk-high { border-left-color: #fd7e14; background: #ffeaa7; }
        .recommendation {
            background: #d1ecf1;
            border-left: 4px solid #17a2b8;
            padding: 15px;
            margin: 10px 0;
            border-radius: 4px;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 0.9em;
        }
        @media print {
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{title}}</h1>
        <p>Generated on {{generatedAt}}</p>
    </div>

    <div class="content">
        <div class="section">
            <h2>Executive Summary</h2>
            <div class="summary-grid">
                <div class="metric-card">
                    <div class="metric-value">{{summary.healthScore}}%</div>
                    <div class="metric-label">Overall Health Score</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">{{summary.keyMetrics.platformsHealthy}}</div>
                    <div class="metric-label">Healthy Platforms</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">{{summary.keyMetrics.servicesOperational}}</div>
                    <div class="metric-label">Operational Services</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">{{summary.keyMetrics.criticalIssues}}</div>
                    <div class="metric-label">Critical Issues</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Platform Health Overview</h2>
            <div class="platform-grid">
                {{#each platforms}}
                <div class="platform-card">
                    <h4>
                        <span class="health-indicator health-{{health}}"></span>
                        {{platform}}
                    </h4>
                    <p><strong>Users:</strong> {{users.active}}</p>
                    <p><strong>Growth:</strong> {{users.growth}}%</p>
                    <p><strong>Performance:</strong> {{performance.responseTime}}ms</p>
                </div>
                {{/each}}
            </div>
        </div>

        <div class="section">
            <h2>Key Risks & Concerns</h2>
            {{#each risks}}
            <div class="risk-item risk-{{severity}}">
                <h4>{{description}}</h4>
                <p><strong>Impact:</strong> {{impact}}</p>
                <p><strong>Recommendation:</strong> {{recommendation}}</p>
            </div>
            {{/each}}
        </div>

        <div class="section">
            <h2>Recommended Actions</h2>
            {{#each recommendations}}
            <div class="recommendation">
                <h4>{{title}}</h4>
                <p>{{description}}</p>
                <p><strong>Priority:</strong> {{priority}} | <strong>Owner:</strong> {{owner}}</p>
            </div>
            {{/each}}
        </div>

        <div class="section">
            <h2>Key Achievements</h2>
            <ul>
                {{#each summary.achievements}}
                <li>{{this}}</li>
                {{/each}}
            </ul>
        </div>

        <div class="section">
            <h2>Next Steps</h2>
            <ul>
                {{#each summary.nextSteps}}
                <li>{{this}}</li>
                {{/each}}
            </ul>
        </div>
    </div>

    <div class="footer">
        <p>OTT Program Management Reporting Tool | Confidential</p>
    </div>
</body>
</html>
    `;
  }

  /**
   * Technical report HTML template
   */
  private getTechnicalTemplate(): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{title}} - Technical Report</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            line-height: 1.4;
            font-size: 12px;
        }
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content { padding: 20px; }
        .section { margin: 30px 0; page-break-inside: avoid; }
        .section h2 { color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 8px; }
        .metrics-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        .metrics-table th, .metrics-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        .metrics-table th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .status-healthy { color: #28a745; font-weight: bold; }
        .status-warning { color: #ffc107; font-weight: bold; }
        .status-critical { color: #dc3545; font-weight: bold; }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        @media print {
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>{{title}} - Technical Report</h1>
        <p>Generated on {{generatedAt}}</p>
    </div>

    <div class="content">
        <div class="section">
            <h2>Platform Metrics</h2>
            <table class="metrics-table">
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Health</th>
                        <th>Users</th>
                        <th>Response Time</th>
                        <th>Error Rate</th>
                        <th>Crash Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each platforms}}
                    <tr>
                        <td>{{platform}}</td>
                        <td class="status-{{health}}">{{health}}</td>
                        <td>{{users.active}}</td>
                        <td>{{performance.responseTime}}ms</td>
                        <td>{{performance.errorRate}}%</td>
                        <td>{{performance.crashRate}}%</td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>
        </div>

        <div class="section">
            <h2>Backend Services</h2>
            <table class="metrics-table">
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Uptime</th>
                        <th>Response Time</th>
                        <th>Throughput</th>
                        <th>Error Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each backend}}
                    <tr>
                        <td>{{service}}</td>
                        <td class="status-{{health}}">{{status}}</td>
                        <td>{{performance.uptime}}%</td>
                        <td>{{performance.responseTime}}ms</td>
                        <td>{{performance.throughput}}</td>
                        <td>{{performance.errorRate}}%</td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>
        </div>

        <div class="section">
            <h2>Operations Overview</h2>
            <table class="metrics-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Health</th>
                        <th>Availability</th>
                        <th>Utilization</th>
                        <th>Incidents</th>
                        <th>MTTR</th>
                    </tr>
                </thead>
                <tbody>
                    {{#each operations}}
                    <tr>
                        <td>{{category}}</td>
                        <td class="status-{{health}}">{{health}}</td>
                        <td>{{performance.availability}}%</td>
                        <td>{{capacity.utilization}}%</td>
                        <td>{{incidents.total}}</td>
                        <td>{{incidents.mttr}}min</td>
                    </tr>
                    {{/each}}
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
    `;
  }
}

export default new PDFExportService();
