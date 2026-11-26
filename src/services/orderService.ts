import { get, limitToFirst, query, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import type { Order } from "../types/order";

export async function obtenerOrdenes(limite = 500): Promise<Order[]> {
  const consulta = query(ref(database), limitToFirst(limite));
  const snapshot = await get(consulta);

  if (!snapshot.exists()) {
    return [];
  }

  const rawData = snapshot.val();
  const lista = Array.isArray(rawData)
    ? rawData.filter(Boolean)
    : Object.values(rawData);

  return lista as Order[];
}