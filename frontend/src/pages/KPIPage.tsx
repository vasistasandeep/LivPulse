import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Container
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import KPIDashboardBuilder from '../components/KPI/KPIDashboardBuilder';
import DashboardViewer from '../components/KPI/DashboardViewer';

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `kpi-tab-${index}`,
    'aria-controls': `kpi-tabpanel-${index}`,
  };
}

const KPIPage: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Check if user has admin permissions
  const hasAdminAccess = user?.role === 'admin';

  if (!hasAdminAccess) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1">
          You don't have permission to access KPI management features.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        KPI Dashboard Management
      </Typography>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="KPI management tabs">
            <Tab label="Dashboard Builder" {...a11yProps(0)} />
            <Tab label="View Dashboards" {...a11yProps(1)} />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <KPIDashboardBuilder />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <DashboardViewer />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default KPIPage;