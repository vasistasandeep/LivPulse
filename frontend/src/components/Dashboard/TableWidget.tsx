import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import { DashboardWidget } from '../../api/dashboardAPI';

interface TableWidgetProps {
  widget: DashboardWidget;
  data?: any;
}

const TableWidget: React.FC<TableWidgetProps> = ({ widget, data }) => {
  const tableData = data?.data || widget.config?.defaultData || [];
  const columns = widget.config?.columns || [];

  if (!columns.length) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {widget.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 150 }}>
            <Typography color="text.secondary">No columns configured</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {widget.title}
        </Typography>
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {columns.map((column: any) => (
                  <TableCell key={column.key} sx={{ fontWeight: 'bold' }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row: any, index: number) => (
                <TableRow key={index}>
                  {columns.map((column: any) => (
                    <TableCell key={column.key}>
                      {row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {tableData.length === 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100 }}>
            <Typography color="text.secondary">No data available</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TableWidget;