import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import kpiAPI from '../../api/kpiAPI';

interface Dashboard {
  id: string;
  name: string;
  description?: string;
  widgets: any[];
  layout: any;
  created_at: string;
  updated_at: string;
}

const DashboardViewer: React.FC = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    dashboard: Dashboard | null;
  }>({ open: false, dashboard: null });

  useEffect(() => {
    fetchDashboards();
  }, []);

  const fetchDashboards = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await kpiAPI.getDashboards();
      setDashboards(response.data || []);
    } catch (err: any) {
      console.error('Error fetching dashboards:', err);
      setError(err.response?.data?.message || 'Failed to fetch dashboards');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDashboard = async (dashboard: Dashboard) => {
    try {
      await kpiAPI.deleteDashboard(dashboard.id);
      setDashboards(prev => prev.filter(d => d.id !== dashboard.id));
      setDeleteDialog({ open: false, dashboard: null });
    } catch (err: any) {
      console.error('Error deleting dashboard:', err);
      setError(err.response?.data?.message || 'Failed to delete dashboard');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Existing Dashboards
      </Typography>

      {dashboards.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          No dashboards created yet. Use the Dashboard Builder to create your first dashboard.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {dashboards.map((dashboard) => (
            <Grid item xs={12} sm={6} md={4} key={dashboard.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {dashboard.name}
                  </Typography>
                  {dashboard.description && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {dashboard.description}
                    </Typography>
                  )}
                  <Box sx={{ mt: 2, mb: 1 }}>
                    <Chip
                      label={`${dashboard.widgets?.length || 0} widgets`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Created: {new Date(dashboard.created_at).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton size="small" color="primary" title="View Dashboard">
                    <ViewIcon />
                  </IconButton>
                  <IconButton size="small" color="primary" title="Edit Dashboard">
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error" 
                    title="Delete Dashboard"
                    onClick={() => setDeleteDialog({ open: true, dashboard })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, dashboard: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the dashboard "{deleteDialog.dashboard?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog({ open: false, dashboard: null })}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => deleteDialog.dashboard && handleDeleteDashboard(deleteDialog.dashboard)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardViewer;