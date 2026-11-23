import { Box, Breadcrumbs, FormControl, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

interface HeaderProps {
  activePage: string;
  selectedCity: string;
  cities: string[];
  onCityChange: (city: string) => void;
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
  onOpenMobileMenu: () => void;
}

export function Header({
  activePage,
  selectedCity,
  cities,
  onCityChange,
  startDate,
  endDate,
  onDateChange,
  onOpenMobileMenu,
}: HeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'center' }, }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <IconButton onClick={onOpenMobileMenu} sx={{ display: { md: 'none' }, color: '#1db954' }}>
            <MenuIcon />
          </IconButton>
          <Box>
            <Breadcrumbs sx={{ color: '#8a9ba8', fontSize: 12 }}>
              <Typography variant="caption" color="#8a9ba8">Pages</Typography>
              <Typography variant="caption" color="#fff">{activePage}</Typography>
            </Breadcrumbs>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
              {activePage}
            </Typography>
          </Box>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl size="small" sx={{ minWidth: 210 }}>
            <Select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              startAdornment={<SearchIcon sx={{ color: '#1db954', mr: 1, fontSize: 18 }} />}
              sx={{
                bgcolor: '#102119',
                color: '#fff',
                borderRadius: 3,
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#1f3b2d' },
                '.MuiSvgIcon-root': { color: '#8a9ba8' },
              }}
            >
              <MenuItem value="ALL">Todas las ciudades</MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="date"
            size="small"
            label="Desde"
            value={startDate}
            onChange={(e) => onDateChange(e.target.value, endDate)}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{
              minWidth: { sm: 180 },
              bgcolor: '#102119',
              borderRadius: 3,
              input: { color: '#fff', fontSize: 13, colorScheme: 'dark' },
              label: { color: '#8a9ba8' },
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#1f3b2d' },
            }}
          />

          <TextField
            type="date"
            size="small"
            label="Hasta"
            value={endDate}
            onChange={(e) => onDateChange(startDate, e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{
              minWidth: { sm: 180 },
              bgcolor: '#102119',
              borderRadius: 3,
              input: { color: '#fff', fontSize: 13, colorScheme: 'dark' },
              label: { color: '#8a9ba8' },
              '.MuiOutlinedInput-notchedOutline': { borderColor: '#1f3b2d' },
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}