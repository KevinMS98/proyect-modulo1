import { Component, inject, input, output } from '@angular/core';
import { PedidoService } from '../../../services/pedido-service';
import { Pedido } from '../../../models/interfaces';


@Component({
  selector: 'app-pedido-card',
  imports: [],
  templateUrl: './pedido-card.html',
  styleUrl: './pedido-card.scss',
})
export class PedidoCard {
  item = input<Pedido>();
  $index = input<number>();

  showEditarButton = input<boolean>(true);

  onEliminarClicked = output<number>();
  onEditarClicked = output<number>();

  pedidoService = inject(PedidoService);

  eliminarPedido(index: number) {
    this.onEliminarClicked.emit(index);
  }

  editarPedido(index: number) {
    this.onEditarClicked.emit(index);
  }
}
