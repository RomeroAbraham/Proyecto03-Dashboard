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
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: { xs: 'stretch', lg: 'center' }, }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <IconButton onClick={onOpenMobileMenu} sx={{ display: { md: 'none' }, color: '#1db954' }}>
            <MenuIcon />
          </IconButton>
          <Box>
            <Breadcrumbs sx={{ color: '#8a9ba8', fontSize: 12 }}>
              <Typography variant="caption" sx={{ color: '#8a9ba8' }}>Pages</Typography>
              <Typography variant="caption" sx={{ color: '#fff' }}>{activePage}</Typography>
            </Breadcrumbs>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#fff' }}>
              {activePage}
            </Typography>
          </Box>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ width: { xs: '100%', sm: 200 } }}>
            <Select
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              startAdornment={<SearchIcon sx={{ color: '#1db954', mr: 1, fontSize: 18 }} />}
              sx={{
                height: 40,      
                fontSize: 13, 
                bgcolor: '#102119',
                color: '#fff',
                borderRadius: 3,
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#0f1f13' },
                '.MuiSvgIcon-root': { color: '#8a9ba8' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1f3b2d' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1db954' },
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
              width: { xs: '100%', sm: 200 },
              label: { color: '#8a9ba8' },
              '& .MuiOutlinedInput-root': {
                height: 40,
                bgcolor: '#102119',
                borderRadius: 3,
                '& input': { color: '#fff', fontSize: 13, colorScheme: 'dark' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#0f1f13' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1f3b2d' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1db954' },
              },
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
              width: { xs: '100%', sm: 200 },
              label: { color: '#8a9ba8' },
              '& .MuiOutlinedInput-root': {
                height: 40,
                bgcolor: '#102119',
                borderRadius: 3,
                '& input': { color: '#fff', fontSize: 13, colorScheme: 'dark' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#0f1f13' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1f3b2d' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1db954' },
              },
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}