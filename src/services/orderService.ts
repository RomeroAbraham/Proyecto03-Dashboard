import { get, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import type { Order } from "../types/order";

export async function obtenerOrdenes(): Promise<Order[]> {
  const snapshot = await get(ref(database));

  if (!snapshot.exists()) {
    return [];
  }

  return Object.values(snapshot.val()).filter(Boolean) as Order[];
}
