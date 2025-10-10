import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { DashboardWidget } from '../../api/dashboardAPI';

interface GaugeWidgetProps {
  widget: DashboardWidget;
  data?: any;
}

const GaugeWidget: React.FC<GaugeWidgetProps> = ({ widget, data }) => {
  const value = data?.value || widget.config?.defaultValue || 0;
  const maxValue = widget.config?.maxValue || 100;
  const minValue = widget.config?.minValue || 0;
  const unit = widget.config?.unit || '%';

  // Calculate percentage for the circular progress
  const percentage = Math.min(100, Math.max(0, ((value - minValue) / (maxValue - minValue)) * 100));

  // Determine color based on value ranges
  const getColor = () => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'error';
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {widget.title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={percentage}
              size={120}
              thickness={8}
              color={getColor() as any}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {value}{unit}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {minValue}{unit} - {maxValue}{unit}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current: {percentage.toFixed(1)}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GaugeWidget;