import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar-admin/search-bar-admin';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE'
import { NotificationButtonComponent } from '../notification-button/notification-button';
registerLocaleData(localeEsPe);
@Component({
  selector: 'app-header',
  templateUrl: './header-admin.html',
  styleUrls: ['./header-admin.css'],
  standalone: true,
  imports: [SearchBarComponent, DatePipe,NotificationButtonComponent] // Importa el componente SearchBarComponent
})
export class HeaderComponent {
  logoSrc = 'assets/Images/logo_Kadosh-2.png';
  logoAlt = 'Logo';
  today = new Date();
  selectedDateISO = this.toISODate(this.today);
  notifCount = 10;

  onSearch(query: string) {
    console.log('Search triggered:', query);
    // Lógica para manejar la búsqueda
  }

  onQueryChange(query: string) {
    console.log('Query changed:', query);
    // Lógica para manejar cambios en el texto de búsqueda
  }
  onBellClick() {
    console.log('Abrir panel de notificaciones');
  }

  openCalendar() {
    const el = document.querySelector<HTMLInputElement>('input.date-input-hidden');
    if (el && (el as any).showPicker) {
      (el as any).showPicker();
    } else {
      el?.click();
    }
  }

  onDateChange(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    if (value) {
      const [y, m, d] = value.split('-').map(Number);
      this.today = new Date(y, m - 1, d);
      this.selectedDateISO = value;
    }
  }

  private toISODate(d: Date) {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
}