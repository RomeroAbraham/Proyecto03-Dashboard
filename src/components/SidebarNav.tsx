import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';

interface SidebarNavProps {
  activeItem: string;
  onNavigate: (item: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const DRAWER_WIDTH = 240;

export function SidebarNav({ activeItem, onNavigate, mobileOpen, onCloseMobile }: SidebarNavProps) {
  const menuItems = [
    { label: 'Dashboard', icon: <HomeIcon /> },
    { label: 'Tables', icon: <TableChartIcon /> },
    { label: 'Billing', icon: <ReceiptLongIcon /> },
  ];

  const accountItems = [
    { label: 'Profile', icon: <PersonIcon /> },
    { label: 'Sign In', icon: <LoginIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ p: 2.5, height: '100%', bgcolor: '#0b141a', color: '#fff' }}>
      <Typography variant="subtitle2" sx={{ letterSpacing: 2, fontWeight: 700, mb: 2, textAlign: 'center' }}>
        PROYECTO 03
      </Typography>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />
      <List>
        {menuItems.map((item) => {
          const isActive = activeItem === item.label;
          return (
            <ListItemButton
              key={item.label}
              onClick={() => {
                onNavigate(item.label);
                onCloseMobile();
              }}
              sx={{
                borderRadius: 3,
                mb: 1,
                bgcolor: isActive ? '#12261e' : 'transparent',
                '&:hover': { bgcolor: '#162f25' },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 38,
                  color: isActive ? '#fff' : '#1db954',
                  bgcolor: isActive ? '#1db954' : '#13241c',
                  p: 0.8,
                  borderRadius: 2,
                  mr: 1.5,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: isActive ? 600 : 400 }} />
            </ListItemButton>
          );
        })}
      </List>
      <Typography variant="caption" sx={{ color: '#8a9ba8', fontWeight: 700, px: 1.5, display: 'block', mt: 2, mb: 1 }}>
        ACCOUNT PAGES
      </Typography>
      <List>
        {accountItems.map((item) => (
          <ListItemButton key={item.label} onClick={() => onNavigate(item.label)} sx={{ borderRadius: 3, mb: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 38, color: '#1db954', bgcolor: '#13241c', p: 0.8, borderRadius: 2, mr: 1.5 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, color: '#b0bec5' }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onCloseMobile}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, bgcolor: '#0b141a', borderRight: '1px solid #1c2c24' },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, bgcolor: '#0b141a', borderRight: '1px solid #1c2c24' },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}