import { Box, Card, CardContent, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { Order } from '../types/order';

interface OrdersDataTableProps {
  orders: Order[];
  totalCompleted: number;
}

export function OrdersDataTable({ orders, totalCompleted }: OrdersDataTableProps) {
  return (
    <Card sx={{ bgcolor: '#0d1915', border: '1px solid #1b3227', borderRadius: 4, color: '#fff' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Detalle de pedidos</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 2, mt: 0.5 }}>
          <CheckCircleIcon sx={{ color: '#1db954', fontSize: 16 }} />
          <Typography variant="caption" color="#8a9ba8">{totalCompleted} completados</Typography>
        </Box>

        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 550 }}>
            <TableHead>
              <TableRow>
                {['ID', 'CIUDAD', 'DISTANCIA', 'TIEMPO', 'ESTADO'].map((col) => (
                  <TableCell key={col} sx={{ color: '#8a9ba8', borderColor: '#1b3227', fontSize: 11, fontWeight: 700 }}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell sx={{ color: '#fff', borderColor: '#1b3227', fontWeight: 600 }}>{order.order_id}</TableCell>
                  <TableCell sx={{ color: '#cfe0d7', borderColor: '#1b3227' }}>{order.city}</TableCell>
                  <TableCell sx={{ color: '#fff', borderColor: '#1b3227', fontWeight: 600 }}>{order.distance_km} km</TableCell>
                  <TableCell sx={{ color: '#fff', borderColor: '#1b3227', fontWeight: 600 }}>
                    {order.actual_delivery_time_minutes ? `${order.actual_delivery_time_minutes} min` : '—'}
                  </TableCell>
                  <TableCell sx={{ borderColor: '#1b3227' }}>
                    <Chip
                      label={order.order_status === 'Completed' ? 'Completado' : 'Cancelado'}
                      size="small"
                      sx={{
                        bgcolor: order.order_status === 'Completed' ? 'rgba(29, 185, 84, 0.15)' : 'rgba(239, 83, 80, 0.15)',
                        color: order.order_status === 'Completed' ? '#1db954' : '#ef5350',
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}