import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),

    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDxCqrWroucPE-QMsYxwS6PN0vS-DuUmlk",
      authDomain: "proyect-modulo1.firebaseapp.com",
      projectId: "proyect-modulo1",
      storageBucket: "proyect-modulo1.firebasestorage.app",
      messagingSenderId: "509073206853",
      appId: "1:509073206853:web:dbe81d41a365155490bd2c",
      measurementId: "G-YBWQD42KLN"
    })),
    provideAuth(() => getAuth()),
  ]
};
