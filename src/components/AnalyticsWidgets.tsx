import { Box, Card, CardContent, CircularProgress, Stack, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { LineChart } from '@mui/x-charts/LineChart';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import React from 'react';

const ALL_TICKS = [0, 100, 500, 1000, 5000, 10000, 50000, 100000];

function formatCompact(n: number) {
  if (n < 1000) return String(n);
  const k = Math.round((n / 1000) * 10) / 10;
  return `${String(k).replace('.', ',')} K`;
}

function scaleValue(value: number, ticks: number[]) {
  const last = ticks.length - 1;
  if (value >= ticks[last]) return 1;
  for (let i = 0; i < last; i++) {
    if (value <= ticks[i + 1]) {
      const t = (value - ticks[i]) / (ticks[i + 1] - ticks[i]);
      return (i + t) / last;
    }
  }
  return 0;
}

export function WelcomeBannerCard({ userName, message, imageSrc }: { userName: string; message: string; imageSrc: string;}) {
  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        minHeight: 220,
        borderRadius: 4,
        color: '#fff',
        background: 'linear-gradient(135deg, #0f291e 0%, #12231B 55%, #0c1b15 100%)',
        border: '1px solid #0a140d',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 340,
          maxWidth: '65%',
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 40%)',
          maskImage: 'linear-gradient(to right, transparent 0%, #000 40%)',
          pointerEvents: 'none',
        }}
      />

      <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
        <Typography variant="body2" sx={{ color: '#a5b8ae' }}>
          Bienvenido,
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, my: 0.5 }}>
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
        background: 'linear-gradient(135deg, #122216 0%, #080f13 100%)',
        border: '1px solid #0a140d',
        borderRadius: 4,
        color: '#fff',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
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
    <Stack spacing={1.5} sx={{ alignItems: "center" }}>
      <Box sx={{ position: 'relative', width: 200, height: 100 }}>
        <Gauge 
        width={200}
          height={115}
          value={percentage}
          valueMin={0}
          valueMax={100}
          startAngle={-90}
          endAngle={90}
          innerRadius="78%"
          outerRadius="100%"
          cornerRadius="40%"
          text={() => ''} 
          sx={{
            [`& .${gaugeClasses.valueArc}`]: { fill: '#1db954' },
            [`& .${gaugeClasses.referenceArc}`]: { fill: '#12241c' },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pt: 2, 
          }}
        >
          <SentimentSatisfiedAltIcon sx={{ color: '#1db954', fontSize: 34 }} />
        </Box>
      </Box>
      <Box sx={{ background: 'linear-gradient(135deg, #16301d 0%, #101722 100%)', px: 3, py: 1, borderRadius: 3, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>{percentage}%</Typography>
        <Typography variant="caption" color="#8a9ba8">Basado en calificación de clientes</Typography>
      </Box>
    </Stack>
  );
}

export function PaymentMethodsGraph({ data }: { data: { method: string; percentage: number }[] }) {
  
  const top = data.reduce((max, d) => (d.percentage > max.percentage ? d : max), data[0]);
  const others = data.filter((d) => d !== top);

  return (
    <Stack spacing={1.8}>
      <Stack spacing={1} sx={{ alignItems: 'center', p: 1.5 }}>        
        <Box sx={{ position: 'relative', width: 120, height: 120 }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={120}
            thickness={5}
            sx={{ color: '#0a1410', position: 'absolute', left: 0, top: 0 }}
          />
          <CircularProgress
            variant="determinate"
            value={top.percentage}
            size={120}
            thickness={5}
            sx={{
              color: '#1db954',
              position: 'absolute',
              left: 0,
              top: 0,
              '& .MuiCircularProgress-circle': { strokeLinecap: 'round' },
            }}
          />
          <Stack sx={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
              {top.percentage}%
            </Typography>
            <Typography variant="caption" color="#1db954" sx={{ fontSize: 10 }}>
              Método más utilizado
            </Typography>
          </Stack>
        </Box>
        <Typography variant="body2" color="#cfe0d7">{top.method}</Typography>
      </Stack>

      <Stack direction="row" spacing={2}>
        {others.map((item) => (
          <Box
            key={item.method}
            sx={{ flex: 1, minWidth: 0, background: 'linear-gradient(135deg, #16301d 0%, #101722 100%)', p: 1.2, borderRadius: 2.5 }}
          >
            <Typography variant="caption" noWrap sx={{ color: '#8a9ba8', display: 'block' }}>
              {item.method}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1db954' }}>
              {item.percentage}%
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

export function HourlyOrdersGraph({ hourlyData }: { hourlyData: { hour: string; orders: number }[] }) {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto', pb: 1 }}>
      <Box sx={{ minWidth: hourlyData.length * 80 }}>
        <LineChart
          height={230}
          xAxis={[{ scaleType: 'point', data: hourlyData.map((d) => d.hour), tickLabelStyle: { fill: '#c8f1dd', fontSize: 11 }, },
          ]}
          yAxis={[{ min: 0, tickLabelStyle: { fill: '#c8f1dd', fontSize: 11 }, }]}
          series={[
            {
              id: 'orders',
              data: hourlyData.map((d) => d.orders),
              area: true,
              curve: 'monotoneX',
              showMark: false,
              color: '#1db954',
            },
          ]}
          grid={{ horizontal: true }}
          margin={{ top: 16, right: 32, bottom: 0, left: 0 }}
          sx={{
            '& .MuiAreaElement-root': { fillOpacity: 0.22 },
            '& .MuiLineElement-root': { strokeWidth: 3 },
            '& .MuiChartsAxis-tickLabel': { fill: '#c8f1dd' },
            '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': { stroke: '#142219' },
            '& .MuiChartsGrid-line': { stroke: '#223f2c', strokeDasharray: '4 4' },
          }}
        />
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
  const PLOT_H = 130;
  const AXIS_W = 36;
  const BAR_W = 26;

  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const idx = ALL_TICKS.findIndex((t) => t >= maxCount);
  const end = idx === -1 ? ALL_TICKS.length : Math.max(idx, 1) + 1;
  const ticks = ALL_TICKS.slice(0, end);
  const last = ticks.length - 1;

  return (
    <Box>
      <Box sx={{ bgcolor: '#0a1410', borderRadius: 3, px: 1.5, pt: 3, pb: 1.5, mb: 3 }}>
        <Stack direction="row">
          <Box sx={{ position: 'relative', width: AXIS_W, height: PLOT_H, flexShrink: 0 }}>
            {ticks.map((t, i) => (
              <Typography
                key={t}
                variant="caption"
                sx={{
                  position: 'absolute',
                  right: 8,
                  bottom: `${(i / last) * 100}%`,
                  transform: 'translateY(50%)',
                  color: '#8a9ba8',
                  fontSize: 10,
                  lineHeight: 1,
                }}
              >
                {formatCompact(t)}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end', flex: 1, minWidth: 0, height: PLOT_H }}>
            {data.map((bucket) => {
              const h = bucket.count > 0 ? Math.max(scaleValue(bucket.count, ticks) * PLOT_H, 6) : 0;
              return (
                <Box
                  key={bucket.range}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 700, fontSize: 10, mb: 0.5, lineHeight: 1 }}>
                    {formatCompact(bucket.count)}
                  </Typography>
                  <Box sx={{ width: BAR_W, height: h, bgcolor: '#fff', borderRadius: 2 }} />
                </Box>
              );
            })}
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ ml: `${AXIS_W}px`, mt: 1 }}>
          {data.map((bucket) => (
            <Typography
              key={bucket.range}
              variant="caption"
              sx={{ flex: 1, minWidth: 0, textAlign: 'center', color: '#8a9ba8', fontSize: 10, lineHeight: 1.2 }}
            >
              {bucket.range}
            </Typography>
          ))}
        </Stack>
      </Box>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Desempeño de las entregas</Typography>
      <Stack direction="row" spacing={2}>
        <Stack direction="row" spacing={1} sx={{ flex: 1, alignItems: 'center', background: 'linear-gradient(135deg, #16301d 0%, #101722 100%)', p: 1.2, borderRadius: 2.5 }}>
          <WbSunnyIcon sx={{ color: '#fbc02d' }} />
          <Box>
            <Typography variant="caption" sx={{ color: '#8a9ba8', display: 'block' }}>Clima más frecuente</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>{mostFrequentWeather}</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ flex: 1, alignItems: 'center', background: 'linear-gradient(135deg, #16301d 0%, #101722 100%)', p: 1.2, borderRadius: 2.5 }}>
          <DirectionsCarIcon sx={{ color: '#ef5350' }} />
          <Box>
            <Typography variant="caption" sx={{ color: '#8a9ba8', display: 'block' }}>Tráfico más frecuente</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>{mostFrequentTraffic}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}