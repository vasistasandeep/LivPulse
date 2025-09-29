import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Tab,
  Tabs,
  Divider,
  Alert,
  Tooltip,
  Paper,
  Switch,
  FormControlLabel,
  Avatar,
  Badge,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Dashboard as DashboardIcon,
  Widgets,
  Storage,
  Settings,
  Save,
  Visibility,
  VisibilityOff,
  Analytics,
  DragIndicator,
  ExpandMore,
  Close,
  DataObject,
  BarChart,
  ShowChart,
  PieChart,
  TableChart,
  SpeedOutlined,
  TrendingUp,
} from '@mui/icons-material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import kpiAPI, { Dashboard, Widget, DataSource, DashboardFormData, WidgetFormData } from '../../api/kpiAPI';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`kpi-tabpanel-${index}`}
      aria-labelledby={`kpi-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const widgetTypes = [
  { value: 'metric', label: 'Metric Card', icon: <DataObject />, description: 'Single value with trend' },
  { value: 'chart', label: 'Chart', icon: <BarChart />, description: 'Line, bar, pie charts' },
  { value: 'table', label: 'Data Table', icon: <TableChart />, description: 'Tabular data display' },
  { value: 'gauge', label: 'Gauge', icon: <SpeedOutlined />, description: 'Progress indicator' },
  { value: 'trend', label: 'Trend', icon: <TrendingUp />, description: 'Trend analysis' },
];

const categories = [
  { value: 'executive', label: 'Executive', color: '#9c27b0' },
  { value: 'technical', label: 'Technical', color: '#2196f3' },
  { value: 'operational', label: 'Operational', color: '#4caf50' },
  { value: 'financial', label: 'Financial', color: '#ff9800' },
  { value: 'security', label: 'Security', color: '#f44336' },
];

const KPIDashboardBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showDashboardDialog, setShowDashboardDialog] = useState(false);
  const [showWidgetDialog, setShowWidgetDialog] = useState(false);
  const [showDataSourceDialog, setShowDataSourceDialog] = useState(false);
  const [editingDashboard, setEditingDashboard] = useState<Dashboard | null>(null);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const [editingDataSource, setEditingDataSource] = useState<DataSource | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<string>('');
  
  // Form states
  const [dashboardForm, setDashboardForm] = useState<DashboardFormData>({
    name: '',
    description: '',
    category: 'executive',
    widgets: [],
    permissions: {
      view: ['admin'],
      edit: ['admin']
    }
  });

  const [widgetForm, setWidgetForm] = useState<WidgetFormData>({
    type: 'metric',
    title: '',
    description: '',
    dataSource: '',
    config: {
      format: 'number',
      refreshInterval: 30
    },
    permissions: ['admin']
  });

  const [dataSourceForm, setDataSourceForm] = useState({
    name: '',
    type: 'api' as const,
    config: {
      url: '',
      method: 'GET' as const,
      refreshInterval: 300
    },
    fields: []
  });

  const queryClient = useQueryClient();

  // Fetch data
  const { data: dashboardsData, isLoading: loadingDashboards } = useQuery({
    queryKey: ['kpi-dashboards'],
    queryFn: () => kpiAPI.getDashboards()
  });

  const { data: widgetsData, isLoading: loadingWidgets } = useQuery({
    queryKey: ['kpi-widgets'],
    queryFn: () => kpiAPI.getWidgets()
  });

  const { data: dataSourcesData, isLoading: loadingDataSources } = useQuery({
    queryKey: ['kpi-data-sources'],
    queryFn: () => kpiAPI.getDataSources()
  });

  const { data: analyticsData } = useQuery({
    queryKey: ['kpi-analytics'],
    queryFn: () => kpiAPI.getKPIAnalytics()
  });

  // Mutations
  const createDashboardMutation = useMutation({
    mutationFn: (data: DashboardFormData) => kpiAPI.createDashboard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kpi-dashboards'] });
      setShowDashboardDialog(false);
      resetDashboardForm();
    }
  });

  const updateDashboardMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DashboardFormData> }) => 
      kpiAPI.updateDashboard(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kpi-dashboards'] });
      setShowDashboardDialog(false);
      setEditingDashboard(null);
      resetDashboardForm();
    }
  });

  const deleteDashboardMutation = useMutation({
    mutationFn: (id: string) => kpiAPI.deleteDashboard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kpi-dashboards'] });
    }
  });

  const createWidgetMutation = useMutation({
    mutationFn: (data: WidgetFormData) => kpiAPI.createWidget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kpi-widgets'] });
      setShowWidgetDialog(false);
      resetWidgetForm();
    }
  });

  const updateWidgetMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<WidgetFormData> }) => 
      kpiAPI.updateWidget(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kpi-widgets'] });
      setShowWidgetDialog(false);
      setEditingWidget(null);
      resetWidgetForm();
    }
  });

  const deleteWidgetMutation = useMutation({
    mutationFn: (id: string) => kpiAPI.deleteWidget(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kpi-widgets'] });
    }
  });

  const createDataSourceMutation = useMutation({
    mutationFn: (data: any) => kpiAPI.createDataSource(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kpi-data-sources'] });
      setShowDataSourceDialog(false);
      resetDataSourceForm();
    }
  });

  const resetDashboardForm = () => {
    setDashboardForm({
      name: '',
      description: '',
      category: 'executive',
      widgets: [],
      permissions: {
        view: ['admin'],
        edit: ['admin']
      }
    });
  };

  const resetWidgetForm = () => {
    setWidgetForm({
      type: 'metric',
      title: '',
      description: '',
      dataSource: '',
      config: {
        format: 'number',
        refreshInterval: 30
      },
      permissions: ['admin']
    });
  };

  const resetDataSourceForm = () => {
    setDataSourceForm({
      name: '',
      type: 'api',
      config: {
        url: '',
        method: 'GET',
        refreshInterval: 300
      },
      fields: []
    });
  };

  const handleSubmitDashboard = () => {
    if (editingDashboard) {
      updateDashboardMutation.mutate({ 
        id: editingDashboard.id, 
        data: dashboardForm 
      });
    } else {
      createDashboardMutation.mutate(dashboardForm);
    }
  };

  const handleSubmitWidget = () => {
    if (editingWidget) {
      updateWidgetMutation.mutate({ 
        id: editingWidget.id, 
        data: widgetForm 
      });
    } else {
      createWidgetMutation.mutate(widgetForm);
    }
  };

  const handleSubmitDataSource = () => {
    createDataSourceMutation.mutate(dataSourceForm);
  };

  const handleEditDashboard = (dashboard: Dashboard) => {
    setEditingDashboard(dashboard);
    setDashboardForm({
      name: dashboard.name,
      description: dashboard.description,
      category: dashboard.category,
      widgets: dashboard.widgets,
      permissions: dashboard.permissions
    });
    setShowDashboardDialog(true);
  };

  const handleEditWidget = (widget: Widget) => {
    setEditingWidget(widget);
    setWidgetForm({
      type: widget.type,
      title: widget.title,
      description: widget.description,
      dataSource: widget.dataSource,
      config: widget.config,
      permissions: widget.permissions
    });
    setShowWidgetDialog(true);
  };

  const dashboards = dashboardsData?.data || [];
  const widgets = widgetsData?.data || [];
  const dataSources = dataSourcesData?.data || [];
  const analytics = analyticsData?.data;

  const getWidgetIcon = (type: string) => {
    switch (type) {
      case 'metric': return <DataObject />;
      case 'chart': return <BarChart />;
      case 'table': return <TableChart />;
      case 'gauge': return <SpeedOutlined />;
      case 'trend': return <TrendingUp />;
      default: return <Widgets />;
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat?.color || '#666';
  };

  return (
    <Box>
      {/* Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <DashboardIcon />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  KPI Dashboard Builder
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Create and manage dashboards, widgets, and data sources
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                startIcon={<Analytics />}
                size="small"
              >
                Analytics
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setShowDashboardDialog(true)}
                size="small"
              >
                New Dashboard
              </Button>
            </Box>
          </Box>

          {/* Quick Stats */}
          {analytics && (
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Card variant="outlined" sx={{ textAlign: 'center', p: 1 }}>
                  <Typography variant="h6" color="primary">{analytics.dashboards.total}</Typography>
                  <Typography variant="caption">Dashboards</Typography>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card variant="outlined" sx={{ textAlign: 'center', p: 1 }}>
                  <Typography variant="h6" color="secondary">{analytics.widgets.total}</Typography>
                  <Typography variant="caption">Widgets</Typography>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card variant="outlined" sx={{ textAlign: 'center', p: 1 }}>
                  <Typography variant="h6" color="success.main">{analytics.dataSources.active}</Typography>
                  <Typography variant="caption">Active Sources</Typography>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card variant="outlined" sx={{ textAlign: 'center', p: 1 }}>
                  <Typography variant="h6" color="warning.main">{analytics.widgets.visible}</Typography>
                  <Typography variant="caption">Visible Widgets</Typography>
                </Card>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab icon={<DashboardIcon />} label="Dashboards" />
            <Tab icon={<Widgets />} label="Widgets" />
            <Tab icon={<Storage />} label="Data Sources" />
          </Tabs>
        </Box>

        {/* Dashboards Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Dashboard Management</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setShowDashboardDialog(true)}
            >
              Create Dashboard
            </Button>
          </Box>

          {loadingDashboards ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {dashboards.map((dashboard: Dashboard) => (
                <Grid item xs={12} md={6} lg={4} key={dashboard.id}>
                  <Card>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {dashboard.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {dashboard.description}
                          </Typography>
                        </Box>
                        <Box display="flex" gap={1}>
                          <IconButton size="small" onClick={() => handleEditDashboard(dashboard)}>
                            <Edit />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => {
                              if (window.confirm('Delete this dashboard?')) {
                                deleteDashboardMutation.mutate(dashboard.id);
                              }
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <Box display="flex" gap={1} mb={2}>
                        <Chip
                          size="small"
                          label={dashboard.category}
                          sx={{ 
                            bgcolor: getCategoryColor(dashboard.category), 
                            color: 'white',
                            fontSize: '0.75rem'
                          }}
                        />
                        <Chip
                          size="small"
                          label={`${dashboard.widgets.length} widgets`}
                          variant="outlined"
                        />
                      </Box>

                      <Typography variant="caption" color="textSecondary">
                        Created: {new Date(dashboard.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>

        {/* Widgets Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Widget Library</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setShowWidgetDialog(true)}
            >
              Create Widget
            </Button>
          </Box>

          {loadingWidgets ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {widgets.map((widget: Widget) => (
                <Grid item xs={12} md={6} lg={4} key={widget.id}>
                  <Card>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}>
                            {getWidgetIcon(widget.type)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {widget.title}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {widget.type.toUpperCase()}
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" gap={1}>
                          <IconButton size="small" onClick={() => handleEditWidget(widget)}>
                            <Edit />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => {
                              if (window.confirm('Delete this widget?')) {
                                deleteWidgetMutation.mutate(widget.id);
                              }
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="textSecondary" mb={2}>
                        {widget.description}
                      </Typography>

                      <Box display="flex" gap={1} mb={1}>
                        <Chip
                          size="small"
                          label={widget.dataSource}
                          variant="outlined"
                        />
                        <Badge 
                          color={widget.isVisible ? 'success' : 'error'}
                          variant="dot"
                        >
                          <Chip
                            size="small"
                            label={widget.isVisible ? 'Visible' : 'Hidden'}
                            variant="outlined"
                          />
                        </Badge>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>

        {/* Data Sources Tab */}
        <TabPanel value={activeTab} index={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Data Source Management</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setShowDataSourceDialog(true)}
            >
              Add Data Source
            </Button>
          </Box>

          {loadingDataSources ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {dataSources.map((dataSource: DataSource) => (
                <Grid item xs={12} md={6} key={dataSource.id}>
                  <Card>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            {dataSource.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {dataSource.type.toUpperCase()} • {dataSource.fields.length} fields
                          </Typography>
                        </Box>
                        <Badge 
                          color={dataSource.isActive ? 'success' : 'error'}
                          variant="dot"
                        >
                          <Chip
                            size="small"
                            label={dataSource.isActive ? 'Active' : 'Inactive'}
                            variant="outlined"
                          />
                        </Badge>
                      </Box>

                      {dataSource.config.url && (
                        <Typography variant="caption" color="textSecondary" sx={{ wordBreak: 'break-all' }}>
                          {dataSource.config.url}
                        </Typography>
                      )}

                      <Box mt={2}>
                        <Typography variant="caption" color="textSecondary">
                          Created: {new Date(dataSource.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>
      </Card>

      {/* Dashboard Dialog */}
      <Dialog open={showDashboardDialog} onClose={() => setShowDashboardDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingDashboard ? 'Edit Dashboard' : 'Create New Dashboard'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Dashboard Name"
                value={dashboardForm.name}
                onChange={(e) => setDashboardForm({ ...dashboardForm, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={dashboardForm.category}
                  label="Category"
                  onChange={(e) => setDashboardForm({ ...dashboardForm, category: e.target.value })}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={dashboardForm.description}
                onChange={(e) => setDashboardForm({ ...dashboardForm, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDashboardDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitDashboard} 
            variant="contained"
            disabled={!dashboardForm.name}
          >
            {editingDashboard ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Widget Dialog */}
      <Dialog open={showWidgetDialog} onClose={() => setShowWidgetDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingWidget ? 'Edit Widget' : 'Create New Widget'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Widget Title"
                value={widgetForm.title}
                onChange={(e) => setWidgetForm({ ...widgetForm, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Widget Type</InputLabel>
                <Select
                  value={widgetForm.type}
                  label="Widget Type"
                  onChange={(e) => setWidgetForm({ ...widgetForm, type: e.target.value as any })}
                >
                  {widgetTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box display="flex" alignItems="center" gap={1}>
                        {type.icon}
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Data Source</InputLabel>
                <Select
                  value={widgetForm.dataSource}
                  label="Data Source"
                  onChange={(e) => setWidgetForm({ ...widgetForm, dataSource: e.target.value })}
                >
                  {dataSources.map((ds: any) => (
                    <MenuItem key={ds.id} value={ds.id}>
                      {ds.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Refresh Interval (seconds)"
                type="number"
                value={widgetForm.config?.refreshInterval || 30}
                onChange={(e) => setWidgetForm({ 
                  ...widgetForm, 
                  config: { 
                    ...widgetForm.config, 
                    refreshInterval: parseInt(e.target.value) 
                  } 
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={widgetForm.description}
                onChange={(e) => setWidgetForm({ ...widgetForm, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowWidgetDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitWidget} 
            variant="contained"
            disabled={!widgetForm.title || !widgetForm.dataSource}
          >
            {editingWidget ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Data Source Dialog */}
      <Dialog open={showDataSourceDialog} onClose={() => setShowDataSourceDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Data Source</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Data Source Name"
                value={dataSourceForm.name}
                onChange={(e) => setDataSourceForm({ ...dataSourceForm, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={dataSourceForm.type}
                  label="Type"
                  onChange={(e) => setDataSourceForm({ ...dataSourceForm, type: e.target.value as any })}
                >
                  <MenuItem value="api">API</MenuItem>
                  <MenuItem value="database">Database</MenuItem>
                  <MenuItem value="file">File</MenuItem>
                  <MenuItem value="mock">Mock Data</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {dataSourceForm.type === 'api' && (
              <>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label="API URL"
                    value={dataSourceForm.config.url}
                    onChange={(e) => setDataSourceForm({ 
                      ...dataSourceForm, 
                      config: { ...dataSourceForm.config, url: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Method</InputLabel>
                    <Select
                      value={dataSourceForm.config.method}
                      label="Method"
                      onChange={(e) => setDataSourceForm({ 
                        ...dataSourceForm, 
                        config: { ...dataSourceForm.config, method: e.target.value as any }
                      })}
                    >
                      <MenuItem value="GET">GET</MenuItem>
                      <MenuItem value="POST">POST</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Refresh Interval (seconds)"
                type="number"
                value={dataSourceForm.config.refreshInterval}
                onChange={(e) => setDataSourceForm({ 
                  ...dataSourceForm, 
                  config: { ...dataSourceForm.config, refreshInterval: parseInt(e.target.value) }
                })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDataSourceDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitDataSource} 
            variant="contained"
            disabled={!dataSourceForm.name}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default KPIDashboardBuilder;