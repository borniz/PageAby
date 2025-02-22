import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig,

  providers: [provideRouter(routes), provideAnimations(), FormsModule, provideHttpClient()],
}).catch((err) => console.error(err));
