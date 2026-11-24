import { get, ref } from "firebase/database";
import { database } from "../firebase/firebase";
import type { Order } from "../types/order";

export async function obtenerOrden( collection: string ): Promise<Order | null> {

  const referencia = ref(database, `${collection}`);

  const snapshot = await get(referencia);

  if (snapshot.exists()) {
    return snapshot.val() as Order;
  }

  return null;
}