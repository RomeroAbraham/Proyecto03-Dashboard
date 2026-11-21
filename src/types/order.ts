export interface Order {
  order_id: string;
  city: string;
  order_date: string;
  order_hour: number;
  distance_km: number;
  actual_delivery_time_minutes: number | null;
  order_status: 'Completed' | 'Cancelled';
  payment_method: string;
  weather: string;
  traffic_level: string;
  customer_rating: number | null;
}