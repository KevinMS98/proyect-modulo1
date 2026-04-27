import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  private API_KEY = '52bee390911be26cf7aa9da6aa862c4c';
  private BASE_URL = 'https://api.tmb.cat/v1';

  constructor(private http: HttpClient) { }

  getLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        pos => resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }),
        err => reject(err)
      );
    });
  }


  private getHeaders() {
    return new HttpHeaders({
      'Accept': 'application/json'
    });
  }

  // 🔥 Paradas cercanas reales (TMB)
  getNearbyStops(userLat: number, userLng: number, stops: any[]) {
    return stops
      .map(stop => ({
        ...stop,
        distance: this.getDistance(userLat, userLng, stop.lat, stop.lng)
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }


  getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }



  // 🚌 próximas llegadas de una parada
  getArrivals(stopId: string) {
    const url = `${this.BASE_URL}/transit/rt/arrivals/${stopId}`;

    return this.http.get(url, {
      headers: this.getHeaders(),
      params: {
        app_key: this.API_KEY
      }
    });
  }
}
