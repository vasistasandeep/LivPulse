export interface DataCategory {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface DataTemplate {
  name: string;
  description: string;
  schema: Record<string, FieldSchema>;
  permissions: string[];
}

export interface FieldSchema {
  type: 'string' | 'number' | 'date' | 'datetime' | 'select' | 'text';
  required: boolean;
  label: string;
  options?: string[];
}

export interface DataEntry {
  id: string;
  category: string;
  data: Record<string, any>;
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  source: 'form' | 'csv';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewComments?: string;
}

export interface ValidationResult {
  valid: boolean;
  message: string;
  errors?: string[];
  submissionId?: string;
  submissionIds?: string[];
}