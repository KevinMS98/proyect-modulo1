import { Injectable, signal } from '@angular/core';
import { Pedido } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {

  pedidos = signal<Pedido[]>([]);

  private storageKey = 'pedidos';

  constructor() {
    this.loadFromStorage();
  }

  // 🔄 Cargar pedidos al iniciar
  private loadFromStorage() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.pedidos.set(JSON.parse(data));
    }
  }

  // 💾 Guardar en localStorage
  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.pedidos()));
  }

  // 📥 Obtener pedidos (ya no hace HTTP)
  async getPedidos(): Promise<void> {
    this.loadFromStorage();
  }

  // ➕ Crear pedido
  async setPedido(pedido: Pedido): Promise<void> {
    const lista = this.pedidos();

    this.pedidos.set([...lista, pedido]);
    this.saveToStorage();
  }

  // ❌ Eliminar pedido
  eliminarPedido(index: number) {
    const lista = this.pedidos();
    lista.splice(index, 1);

    this.pedidos.set([...lista]);
    this.saveToStorage();
  }

  // ✏️ Editar pedido
  editarPedido(index: number, nuevo: Pedido) {
    const lista = this.pedidos();
    lista[index] = nuevo;

    this.pedidos.set([...lista]);
    this.saveToStorage();
  }
}

