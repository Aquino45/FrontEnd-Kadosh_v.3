import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
<<<<<<< HEAD
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';

bootstrapApplication(App, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient() // 👈 habilita HttpClient para tus services
  ]
}).catch(err => console.error(err));
=======
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789
