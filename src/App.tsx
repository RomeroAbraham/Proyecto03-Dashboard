import { useMemo, useState } from 'react';
import { Alert, Box, CssBaseline, Grid, CircularProgress, Typography } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import useFetchData from './hooks/useFetchData';
import { SidebarNav, DRAWER_WIDTH } from './components/SidebarNav';
import { Header } from './components/Header';
import { KpiCard } from './components/KpiCard';
import repartidor from './assets/repartidor.png';

import {
  WelcomeBannerCard,
  ChartCard,
  SatisfactionGraph,
  PaymentMethodsGraph,
  HourlyOrdersGraph,
  DeliveryPerformanceGraph,
} from './components/AnalyticsWidgets';
import { OrdersDataTable } from './components/OrdersDataTable';

export function App() {
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [startDate, setStartDate] = useState<string>('2025-10-01');
  const [endDate, setEndDate] = useState<string>('2025-10-31');
  const [activePage, setActivePage] = useState<string>('Dashboard');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const { orders, loading, error } = useFetchData();

  const cities = useMemo(
    () => Array.from(new Set(orders.map((o) => o.city).filter(Boolean))).sort(),
    [orders]
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchCity = selectedCity === 'ALL' || order.city === selectedCity;
      const matchDate =
        (!startDate || order.order_date >= startDate) &&
        (!endDate || order.order_date <= endDate);
      return matchCity && matchDate;
    });
  }, [orders, selectedCity, startDate, endDate]);

  const metrics = useMemo(() => {
    const completedOrders = filteredOrders.filter((o) => o.order_status === 'Completed');
    const avgTime = completedOrders.length
      ? Math.round(
        completedOrders.reduce((acc, o) => acc + (o.actual_delivery_time_minutes || 0), 0) /
        completedOrders.length
      )
      : 0;
    const cancelRate = filteredOrders.length
      ? (((filteredOrders.length - completedOrders.length) / filteredOrders.length) * 100).toFixed(2)
      : '0.00';

    const ratedOrders = completedOrders.filter((o) => o.customer_rating != null && o.customer_rating !== ('' as unknown));
    const satisfactionPct = ratedOrders.length
      ? Math.round(
        (ratedOrders.reduce((acc, o) => acc + Number(o.customer_rating || 0), 0) /
          (ratedOrders.length * 5)) *
        100
      )
      : 0;

    // Distribución de métodos de pago desde Firebase
    const total = filteredOrders.length || 1;
    const creditCount = filteredOrders.filter((o) => o.payment_method === 'Credit Card').length;
    const cashCount = filteredOrders.filter((o) => o.payment_method === 'Cash').length;
    const creditPct = Math.round((creditCount / total) * 100);
    const cashPct = Math.round((cashCount / total) * 100);
    const otherPct = Math.max(0, 100 - creditPct - cashPct);

    const paymentData = [
      { method: 'Tarjeta de Crédito', percentage: creditPct },
      { method: 'Efectivo', percentage: cashPct },
      { method: 'Otros', percentage: otherPct },
    ].sort((a, b) => b.percentage - a.percentage);

    // Pedidos por hora desde Firebase
    const targetHours = [9, 11, 13, 15, 17, 19, 21, 23];
    const hourlyData = targetHours.map((h) => ({
      hour: `${String(h).padStart(2, '0')}:00`,
      orders: filteredOrders.filter((o) => Number(o.order_hour) === h).length,
    }));

    // Rangos de tiempo de entrega desde Firebase
    const deliveryRanges = [
      { range: '10-18 min', count: completedOrders.filter((o) => Number(o.actual_delivery_time_minutes) < 18).length },
      { range: '18-26 min', count: completedOrders.filter((o) => Number(o.actual_delivery_time_minutes) >= 18 && Number(o.actual_delivery_time_minutes) < 26).length },
      { range: '26-34 min', count: completedOrders.filter((o) => Number(o.actual_delivery_time_minutes) >= 26 && Number(o.actual_delivery_time_minutes) < 34).length },
      { range: '34-42 min', count: completedOrders.filter((o) => Number(o.actual_delivery_time_minutes) >= 34 && Number(o.actual_delivery_time_minutes) < 42).length },
      { range: '42-50 min', count: completedOrders.filter((o) => Number(o.actual_delivery_time_minutes) >= 42).length },
    ];

    // Clima y tráfico más frecuentes
    const getTopFrequency = (items: string[], fallback: string) => {
      const counts: Record<string, number> = {};
      for (const item of items) {
        if (item) counts[item] = (counts[item] || 0) + 1;
      }
      return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || fallback;
    };

    const mostFrequentWeather = getTopFrequency(filteredOrders.map((o) => o.weather), 'Clear');
    const mostFrequentTraffic = getTopFrequency(filteredOrders.map((o) => o.traffic_level), 'Medium');

    return {
      completedOrders,
      avgTime,
      cancelRate,
      satisfactionPct,
      paymentData,
      hourlyData,
      deliveryRanges,
      mostFrequentWeather,
      mostFrequentTraffic,
    };
  }, [filteredOrders]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#070f0c' }}>
      <CssBaseline />
      <SidebarNav
        activeItem={activePage}
        onNavigate={setActivePage}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, md: 3 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Header
          activePage={activePage}
          selectedCity={selectedCity}
          cities={cities}
          onCityChange={setSelectedCity}
          startDate={startDate}
          endDate={endDate}
          onDateChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />

        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, gap: 2 }}>
            <CircularProgress sx={{ color: '#1db954' }} />
            <Typography sx={{ color: '#cfe0d7' }}>Recuperando datos desde Firebase Realtime Database...</Typography>
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2.5 }}>{error}</Alert>
        ) : (
          <>
            {/* Indicadores */}
            <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <KpiCard title="Total pedidos" value={filteredOrders.length} icon={<RestaurantIcon />} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <KpiCard title="Tiempo promedio de entrega" value={`~${metrics.avgTime} min`} icon={<AccessTimeIcon />} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <KpiCard title="Cancelaciones" value={`${metrics.cancelRate}%`} icon={<CancelOutlinedIcon />} />
              </Grid>
            </Grid>

            {/* Banner y Widgets */}
            <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
              <Grid size={{ xs: 12, lg: 5 }}>
                <WelcomeBannerCard
                  userName="John Doe"
                  message="Un gusto volverte a ver! Aquí las estadísticas que deseas ver."
                  imageSrc={repartidor}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <ChartCard title="Satisfacción del cliente">
                  <SatisfactionGraph percentage={metrics.satisfactionPct} />
                </ChartCard>
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <ChartCard title="Distribución de métodos de pago">
                  <PaymentMethodsGraph data={metrics.paymentData} />
                </ChartCard>
              </Grid>

              <Grid size={{ xs: 12, lg: 7 }} sx={{ minWidth: 0 }}>
                <ChartCard title="Pedidos por hora" subtitle="Distribución de pedidos durante el día">
                  <HourlyOrdersGraph hourlyData={metrics.hourlyData} />
                </ChartCard>
              </Grid>

              <Grid size={{ xs: 12, lg: 5 }}>
                <ChartCard title="Rangos de tiempo de entrega">
                  <DeliveryPerformanceGraph
                    data={metrics.deliveryRanges}
                    mostFrequentWeather={metrics.mostFrequentWeather}
                    mostFrequentTraffic={metrics.mostFrequentTraffic}
                  />
                </ChartCard>
              </Grid>
            </Grid>

            {/* Tabla (renderiza las primeras 25 filas para fluidez) */}
            <OrdersDataTable
              orders={filteredOrders}
              totalCompleted={metrics.completedOrders.length}
            />
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;