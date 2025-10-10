import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Fab
} from '@mui/material';
import {
  Refresh,
  Edit,
  Add,
  Save,
  Cancel
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDashboardTemplate,
  getMultipleDashboardData,
  updateDashboardTemplate,
  DashboardWidget,
  DashboardTemplate
} from '../api/dashboardAPI';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import MetricWidget from '../components/Dashboard/MetricWidget';
import ChartWidget from '../components/Dashboard/ChartWidget';
import TableWidget from '../components/Dashboard/TableWidget';
import GaugeWidget from '../components/Dashboard/GaugeWidget';

const DashboardPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState<DashboardTemplate | null>(null);

  // Fetch dashboard template
  const { data: template, isLoading: templateLoading, error: templateError } = useQuery({
    queryKey: ['dashboard-template'],
    queryFn: getDashboardTemplate,
  });

  // Fetch dashboard data for all widgets
  const dataSources = template?.widgets?.map(w => w.dataSource).filter((v, i, a) => a.indexOf(v) === i) || [];
  const { data: dashboardData, isLoading: dataLoading } = useQuery({
    queryKey: ['dashboard-data', dataSources],
    queryFn: () => getMultipleDashboardData(dataSources),
    enabled: dataSources.length > 0,
  });

  // Update template mutation
  const updateTemplateMutation = useMutation({
    mutationFn: ({ role, template }: { role: string; template: Partial<DashboardTemplate> }) =>
      updateDashboardTemplate(role, template),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-template'] });
      setEditMode(false);
      setEditedTemplate(null);
    },
  });

  const handleEditToggle = () => {
    if (editMode) {
      setEditMode(false);
      setEditedTemplate(null);
    } else {
      setEditMode(true);
      setEditedTemplate(template || null);
    }
  };

  const handleSaveTemplate = () => {
    if (editedTemplate && user?.role) {
      updateTemplateMutation.mutate({
        role: user.role,
        template: editedTemplate
      });
    }
  };

  const handleWidgetUpdate = (widgetId: string, updates: Partial<DashboardWidget>) => {
    if (editedTemplate) {
      setEditedTemplate({
        ...editedTemplate,
        widgets: editedTemplate.widgets.map(widget =>
          widget.id === widgetId ? { ...widget, ...updates } : widget
        )
      });
    }
  };

  const renderWidget = (widget: DashboardWidget) => {
    const data = dashboardData?.[widget.dataSource];

    switch (widget.type) {
      case 'metric':
        return <MetricWidget key={widget.id} widget={widget} data={data} />;
      case 'chart':
        return <ChartWidget key={widget.id} widget={widget} data={data} />;
      case 'table':
        return <TableWidget key={widget.id} widget={widget} data={data} />;
      case 'gauge':
        return <GaugeWidget key={widget.id} widget={widget} data={data} />;
      default:
        return (
          <Card key={widget.id} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">{widget.title}</Typography>
              <Typography color="text.secondary">Widget type not supported</Typography>
            </CardContent>
          </Card>
        );
    }
  };

  if (templateLoading || dataLoading) {
    return <LoadingSpinner />;
  }

  if (templateError) {
    return (
      <Alert severity="error">
        Failed to load dashboard. Please try again later.
      </Alert>
    );
  }

  if (!template) {
    return (
      <Alert severity="info">
        No dashboard template found for your role. Please contact an administrator.
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {template.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {template.description}
          </Typography>
          <Chip
            label={`Role: ${user?.role?.toUpperCase()}`}
            color="primary"
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<Refresh />}
            onClick={() => queryClient.invalidateQueries({ queryKey: ['dashboard-data'] })}
          >
            Refresh Data
          </Button>

          {isAdmin && (
            <Button
              variant={editMode ? "contained" : "outlined"}
              startIcon={editMode ? <Save /> : <Edit />}
              onClick={handleEditToggle}
              color={editMode ? "success" : "primary"}
            >
              {editMode ? 'Save Changes' : 'Edit Dashboard'}
            </Button>
          )}
        </Box>
      </Box>

      {/* Dashboard Grid */}
      <Grid container spacing={3}>
        {(editMode ? editedTemplate?.widgets : template.widgets)?.map((widget) => (
          <Grid
            key={widget.id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={widget.position.w === 3 ? 4 : widget.position.w === 6 ? 8 : 12}
          >
            {editMode ? (
              <Card sx={{ height: '100%', border: '2px dashed #ccc' }}>
                <CardContent>
                  <TextField
                    fullWidth
                    label="Widget Title"
                    value={widget.title}
                    onChange={(e) => handleWidgetUpdate(widget.id, { title: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Widget Type"
                    value={widget.type}
                    onChange={(e) => handleWidgetUpdate(widget.id, { type: e.target.value as any })}
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="metric">Metric</MenuItem>
                    <MenuItem value="chart">Chart</MenuItem>
                    <MenuItem value="table">Table</MenuItem>
                    <MenuItem value="gauge">Gauge</MenuItem>
                  </TextField>
                  <Typography variant="body2" color="text.secondary">
                    Position: {widget.position.x}, {widget.position.y} | Size: {widget.position.w}x{widget.position.h}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              renderWidget(widget)
            )}
          </Grid>
        ))}
      </Grid>

      {/* Edit Mode Actions */}
      {editMode && (
        <Box sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', gap: 2 }}>
          <Fab color="success" onClick={handleSaveTemplate} disabled={updateTemplateMutation.isPending}>
            <Save />
          </Fab>
          <Fab color="error" onClick={handleEditToggle}>
            <Cancel />
          </Fab>
        </Box>
      )}

      {/* Loading overlay for mutations */}
      {updateTemplateMutation.isPending && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <LoadingSpinner />
        </Box>
      )}
    </Box>
  );
};

export default DashboardPage;
