import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-restaurantes-card',
  imports: [],
  templateUrl: './restaurantes-card.html',
  styleUrl: './restaurantes-card.scss',
})
export class RestaurantesCard {
  restaurant = input<any>();

  onVerMapa = output<{ lat: number; lng: number }>();

  verEnMapa() {
    this.onVerMapa.emit({
      lat: this.restaurant().lat,
      lng: this.restaurant().lng
    });
  }
}
