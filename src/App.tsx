import { useState } from 'react';
import { Box, CssBaseline, Grid } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { MOCK_ORDERS } from './data/mockOrders';
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
  const [endDate, setEndDate] = useState<string>('2025-10-30');
  const [activePage, setActivePage] = useState<string>('Dashboard');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const cities = Array.from(new Set(MOCK_ORDERS.map((o) => o.city))).sort();

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchCity = selectedCity === 'ALL' || order.city === selectedCity;
    const matchDate = order.order_date >= startDate && order.order_date <= endDate;
    return matchCity && matchDate;
  });

  const completedOrders = filteredOrders.filter((o) => o.order_status === 'Completed');
  const avgTime = completedOrders.length
    ? Math.round(completedOrders.reduce((acc, o) => acc + (o.actual_delivery_time_minutes || 0), 0) / completedOrders.length)
    : 0;
  const cancelRate = filteredOrders.length
    ? (((filteredOrders.length - completedOrders.length) / filteredOrders.length) * 100).toFixed(2)
    : '0.00';

  const ratedOrders = completedOrders.filter((o) => o.customer_rating !== null);
  const satisfactionPct = ratedOrders.length
    ? Math.round((ratedOrders.reduce((acc, o) => acc + (o.customer_rating || 0), 0) / (ratedOrders.length * 5)) * 100)
    : 0;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#070f0c' }}>
      <CssBaseline />
      <SidebarNav
        activeItem={activePage}
        onNavigate={setActivePage}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, p: { xs: 2, md: 3 }, width: { md: `calc(100% - ${DRAWER_WIDTH}px)` }, }}>
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

        <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <KpiCard title="Total pedidos" value={filteredOrders.length} icon={<RestaurantIcon />} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <KpiCard title="Tiempo promedio de entrega" value={`~${avgTime} min`} icon={<AccessTimeIcon />} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <KpiCard title="Cancelaciones" value={`${cancelRate}%`} icon={<CancelOutlinedIcon />} />
          </Grid>
        </Grid>

        <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <WelcomeBannerCard userName="John Doe" message="Un gusto volverte a ver! Aquí las estadísticas que deseas ver." imageSrc={repartidor} />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <ChartCard title="Satisfacción del cliente">
              <SatisfactionGraph percentage={satisfactionPct} />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <ChartCard title="Distribución de métodos de pago">
              <PaymentMethodsGraph
                data={[
                  { method: 'Tarjeta de Crédito', percentage: 70 },
                  { method: 'Efectivo', percentage: 20 },
                  { method: 'Otros', percentage: 10 },
                ]}
              />
            </ChartCard>
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <ChartCard title="Pedidos por hora" subtitle="Distribución de pedidos durante el día">
              <HourlyOrdersGraph
                hourlyData={[
                  { hour: '09:00', orders: 2800 },
                  { hour: '11:00', orders: 3400 },
                  { hour: '13:00', orders: 5200 },
                  { hour: '15:00', orders: 7100 },
                  { hour: '17:00', orders: 4600 },
                  { hour: '19:00', orders: 5400 },
                  { hour: '21:00', orders: 6400 },
                  { hour: '23:00', orders: 6400 }
                ]}
              />
            </ChartCard>
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }}>
            <ChartCard title="Rangos de tiempo de entrega">
              <DeliveryPerformanceGraph
                data={[
                  { range: '10-18 min', count: 1700 },
                  { range: '18-26 min', count: 320 },
                  { range: '26-34 min', count: 9900 },
                  { range: '34-42 min', count: 8600 },
                  { range: '42-50 min', count: 350 },
                ]}
                mostFrequentWeather="Lluvioso"
                mostFrequentTraffic="Alto"
              />
            </ChartCard>
          </Grid>
        </Grid>

        <OrdersDataTable orders={filteredOrders} totalCompleted={completedOrders.length} />
      </Box>
    </Box>
  );
}

export default App;