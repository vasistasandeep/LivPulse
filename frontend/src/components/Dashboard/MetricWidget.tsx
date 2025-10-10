import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { DashboardWidget } from '../../api/dashboardAPI';

interface MetricWidgetProps {
  widget: DashboardWidget;
  data?: any;
}

const MetricWidget: React.FC<MetricWidgetProps> = ({ widget, data }) => {
  const value = data?.value || widget.config?.defaultValue || 0;
  const unit = widget.config?.unit || '';
  const trend = data?.trend;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {widget.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
          {unit && (
            <Typography variant="h6" color="text.secondary">
              {unit}
            </Typography>
          )}
        </Box>
        {trend && (
          <Typography
            variant="body2"
            sx={{
              color: trend.direction === 'up' ? 'success.main' : 'error.main',
              mt: 1
            }}
          >
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}% {trend.label}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricWidget;