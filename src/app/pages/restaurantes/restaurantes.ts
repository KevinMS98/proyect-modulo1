import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-restaurantes',
  imports: [],
  templateUrl: './restaurantes.html',
  styleUrl: './restaurantes.scss',
})
export class Restaurantes {
  lat = signal<number | null>(null);
  lng = signal<number | null>(null);
  buses = signal<any[]>([]);

  async obtenerUbicacion() {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    this.lat.set(pos.coords.latitude);
    this.lng.set(pos.coords.longitude);

    await this.cargarBuses();
  }

  async cargarBuses() {
    const lat = this.lat();
    const lng = this.lng();

    const url = `API_AMB_AQUI?lat=${lat}&lng=${lng}`;

    const res = await fetch(url);
    const data = await res.json();

    this.buses.set(data.stops);
  }
}
