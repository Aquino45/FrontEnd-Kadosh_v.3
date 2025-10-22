<<<<<<< HEAD
import { ApplicationConfig, provideZoneChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

=======
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
<<<<<<< HEAD
    provideRouter(routes),
    provideHttpClient() // <- solo esto
=======
    provideRouter(routes)
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789
  ]
};
