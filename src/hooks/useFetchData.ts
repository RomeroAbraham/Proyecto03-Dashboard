import { useEffect, useState } from 'react';
import { obtenerOrdenes } from '../services/orderService';
import type { Order } from '../types/order';

interface FetchDataOutput {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export default function useFetchData(): FetchDataOutput {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const datos = await obtenerOrdenes();
        setOrders(datos);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'No se pudieron cargar los pedidos');
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, []);

  return { orders, loading, error };
}