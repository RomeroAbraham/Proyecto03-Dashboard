import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export function KpiCard({ title, value, icon }: KpiCardProps) {
  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #12281e 0%, #0d1915 100%)',
        border: '1px solid #1d382b',
        borderRadius: 4,
        color: '#fff',
      }}
    >
      <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="caption" sx={{ color: '#a5b8ae', display: 'block', mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: '#1db954',
              color: '#08140e',
              p: 1.2,
              borderRadius: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}