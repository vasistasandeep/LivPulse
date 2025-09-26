import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  data: any[];
  type: 'line' | 'area' | 'bar' | 'pie';
  dataKey?: string;
  xAxisKey?: string;
  height?: number;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
}

const ChartContainer = ({
  title,
  subtitle,
  data,
  type,
  dataKey = 'value',
  xAxisKey = 'name',
  height = 300,
  colors = ['#2196f3', '#4caf50', '#ff9800', '#f44336', '#9c27b0'],
  showLegend = true,
  showGrid = true
}: ChartContainerProps) => {
  return (
    <Card>
      <CardContent>
        <Box mb={2}>
          <Typography variant="h6" component="div" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="textSecondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box 
          height={height} 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          bgcolor="#f5f5f5"
          borderRadius={1}
        >
          <Typography variant="body2" color="textSecondary">
            📊 {type.toUpperCase()} Chart - {data.length} data points
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartContainer;
