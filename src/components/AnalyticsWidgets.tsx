import { Box, Card, CardContent, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import React from 'react';

export function WelcomeBannerCard({ userName, message }: { userName: string; message: string }) {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        color: '#fff',
        background: 'linear-gradient(120deg, #0f291e 0%, #154c33 55%, #0c1b15 100%)',
        border: '1px solid #1f4232',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="body2" sx={{ color: '#a5b8ae' }}>
          Bienvenido,
        </Typography>
        <Typography variant="h4" fontWeight={700} sx={{ my: 0.5 }}>
          {userName}
        </Typography>
        <Typography variant="body2" sx={{ color: '#cfe0d7', maxWidth: 240, mt: 1.5 }}>
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
}

export function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <Card
      sx={{
        height: '100%',
        bgcolor: '#0d1915',
        border: '1px solid #1b3227',
        borderRadius: 4,
        color: '#fff',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ color: '#8a9ba8', display: 'block', mb: 2 }}>
            {subtitle}
          </Typography>
        )}
        <Box sx={{ mt: subtitle ? 0 : 2 }}>{children}</Box>
      </CardContent>
    </Card>
  );
}

export function SatisfactionGraph({ percentage }: { percentage: number }) {
  return (
    <Stack alignItems="center" spacing={1.5}>
      <Box sx={{ position: 'relative', width: 115, height: 115 }}>
        <CircularProgress
          variant="determinate"
          value={percentage}
          size={115}
          thickness={5}
          sx={{ color: '#1db954' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SentimentSatisfiedAltIcon sx={{ color: '#1db954', fontSize: 34 }} />
        </Box>
      </Box>
      <Box sx={{ bgcolor: '#12241c', px: 3, py: 1, borderRadius: 3, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700}>{percentage}%</Typography>
        <Typography variant="caption" color="#8a9ba8">Basado en calificación de clientes</Typography>
      </Box>
    </Stack>
  );
}

export function PaymentMethodsGraph({ data }: { data: { method: string; percentage: number }[] }) {
  return (
    <Stack spacing={1.8} width="100%">
      {data.map((item) => (
        <Box key={item.method} sx={{ bgcolor: '#12241c', p: 1.5, borderRadius: 2.5, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8, width: '100%' }}>
            <Typography variant="body2" color="#cfe0d7">{item.method}</Typography>
            <Typography variant="body2" fontWeight={700} color="#1db954">{item.percentage}%</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={item.percentage}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: '#0a1410',
              '& .MuiLinearProgress-bar': { bgcolor: '#1db954' },
            }}
          />
        </Box>
      ))}
    </Stack>
  );
}
export function HourlyOrdersGraph({ hourlyData }: { hourlyData: { hour: string; orders: number }[] }) {
  const maxVal = Math.max(...hourlyData.map((d) => d.orders), 1);
  return (
    <Box sx={{ overflowX: 'auto', pb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, minWidth: 460, height: 170, pt: 2 }}>
        {hourlyData.map((item) => (
          <Box
            key={item.hour}
            sx={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 0.5,
            }}
          >
            <Typography variant="caption" color="#1db954" fontWeight={600}>{item.orders}</Typography>
            <Box
              sx={{
                width: '100%',
                maxWidth: 28,
                height: `${Math.max((item.orders / maxVal) * 115, 10)}px`,
                background: 'linear-gradient(180deg, #1db954 0%, #0d3b23 100%)',
                borderRadius: '6px 6px 0 0',
              }}
            />
            <Typography variant="caption" color="#8a9ba8">{item.hour}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function DeliveryPerformanceGraph({
  data,
  mostFrequentWeather,
  mostFrequentTraffic,
}: {
  data: { range: string; count: number }[];
  mostFrequentWeather: string;
  mostFrequentTraffic: string;
}) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 1.5, height: 120, mb: 2.5 }}>
        {data.map((bucket) => (
          <Box
            key={bucket.range}
            sx={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 0.5,
            }}
          >
            <Typography variant="caption" color="#cfe0d7">{bucket.count}</Typography>
            <Box
              sx={{
                width: 14,
                height: `${Math.max((bucket.count / maxCount) * 75, 8)}px`,
                bgcolor: '#fff',
                borderRadius: 2,
              }}
            />
            <Typography variant="caption" sx={{ color: '#8a9ba8', fontSize: 10 }}>{bucket.range}</Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="subtitle2" fontWeight={700} mb={1}>Desempeño de las entregas</Typography>
      <Stack direction="row" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1} flex={1} sx={{ bgcolor: '#12241c', p: 1.2, borderRadius: 2.5 }}>
          <WbSunnyIcon sx={{ color: '#fbc02d' }} />
          <Box>
            <Typography variant="caption" color="#8a9ba8" display="block">Clima más frecuente</Typography>
            <Typography variant="body2" fontWeight={700}>{mostFrequentWeather}</Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} flex={1} sx={{ bgcolor: '#12241c', p: 1.2, borderRadius: 2.5 }}>
          <DirectionsCarIcon sx={{ color: '#ef5350' }} />
          <Box>
            <Typography variant="caption" color="#8a9ba8" display="block">Tráfico más frecuente</Typography>
            <Typography variant="body2" fontWeight={700}>{mostFrequentTraffic}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}