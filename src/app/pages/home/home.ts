import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PedidoService } from '../../services/pedido-service';
import { Header } from '../../shared/components/header/header';
import { PedidoCard } from '../../shared/components/pedido-card/pedido-card';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, PedidoCard, ReactiveFormsModule, MatInputModule, MatCheckboxModule, MatFormFieldModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  pedidoService = inject(PedidoService);
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  submitted = signal(false);
  loading = signal(false);

  pedidoForm = this.fb.group({
    tipo: ['', Validators.required],
    origen: ['', Validators.required],
    peso: ['', Validators.required],
    maduracion: ['', Validators.required],
    cantidad: ['', Validators.required]
  });

  ngOnInit() {
    this.pedidoService.getPedidos(); // 👈 ¡Esto carga la lista al entrar!
  }

  addPedido() {
    if (this.pedidoForm.valid) {
      const newPedido = this.pedidoForm.value;
      this.pedidoService.setPedido(newPedido as any); // 👈 Agrega el nuevo pedido
      this.pedidoForm.reset(); // 👈 Limpia el formulario
    }
  }



  eliminarItem(index: number) {
    console.log('Eliminar pedido en la página carrito en index:', index);
    this.pedidoService.eliminarPedido(index);
  }



  editarItem(index: number) {
    console.log('Editar pedido en la página carrito en index:', index);
  }
}
