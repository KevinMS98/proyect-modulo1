import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/components/header/header';
// @ts-ignore
import * as L from 'leaflet';
import { RestaurantesCard } from '../../shared/components/restaurantes-card/restaurantes-card';

@Component({
  selector: 'app-restaurantes',
  standalone: true,
  imports: [Header, CommonModule, RestaurantesCard],
  templateUrl: './restaurantes.html',
  styleUrl: './restaurantes.scss',
})
export class Restaurantes {

  stops = signal<any[]>([]);
  loading = signal(false);

  lat = signal<number | null>(null);
  lng = signal<number | null>(null);

  restaurants = signal([
    {
      name: 'Burger Catalunya',
      lat: 41.3870,
      lng: 2.1701,
      image: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/1d/2e/03/62/entrada-al-restaurante.jpg',
      description: '🍔 En Pl. Catalunya'
    },
    {
      name: 'Pasta Universitat',
      lat: 41.3856,
      lng: 2.1635,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2QvWuH2Oy_MsA-3Po10e45fpxE1wBRbkPCA&s',
      description: '🍝 Cerca de Universitat'
    },
    {
      name: 'Taco Born',
      lat: 41.3853,
      lng: 2.1822,
      image: 'https://estaticos-cdn.prensaiberica.es/clip/b6374dac-e367-426f-b36d-1f46e84621d2_alta-libre-aspect-ratio_default_0.jpg',
      description: '🌮 El Born'
    }
  ]);


  map: any;

  // 📍 detectar ubicación + cargar todo
  async detectar() {
    this.loading.set(true);

    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const userLat = pos.coords.latitude;
    const userLng = pos.coords.longitude;

    this.lat.set(userLat);
    this.lng.set(userLng);

    // 🗺️ inicializar mapa
    this.initMap(userLat, userLng);

    const allStops = await this.getStops();
    const nearby = this.getNearbyStops(userLat, userLng, allStops);

    this.stops.set(
      nearby.map(s => ({
        ...s,
        nextBuses: [
          Math.floor(Math.random() * 10) + 1,
          Math.floor(Math.random() * 15) + 5
        ]
      }))
    );

    // 🚏 pintar paradas en el mapa
    this.addStopsToMap(this.stops());

    this.loading.set(false);
  }

  // 📦 cargar JSON
  getStops() {
    return fetch('/assets/amb-stops.json')
      .then(r => r.json());
  }

  // 📍 filtrar cercanas
  getNearbyStops(lat: number, lng: number, stops: any[]) {
    return stops
      .map(s => ({
        ...s,
        distance: this.getDistance(lat, lng, s.lat, s.lng)
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }

  // 📏 distancia real
  getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // 🗺️ crear mapa tipo Google Maps
  initMap(lat: number, lng: number) {

    this.map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // 📍 marcador usuario
    L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup('📍 Estás aquí')
      .openPopup();
  }

  // 🚏 añadir paradas al mapa
  addStopsToMap(stops: any[]) {
    stops.forEach(stop => {
      L.marker([stop.lat, stop.lng])
        .addTo(this.map)
        .bindPopup(`
          🚏 ${stop.name}<br>
          📏 ${stop.distance.toFixed(2)} km<br>
          🚌 Próximos: ${stop.nextBuses.join(', ')} min
        `);
    });
  }
}
