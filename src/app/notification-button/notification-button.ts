import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notif-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-button.html',
  styleUrls: ['./notification-button.css']
})
export class NotificationButtonComponent {
  /** Número a mostrar en el badge (0 = sin badge) */
  @Input() badge = 0;

  /** Texto para accesibilidad (aria-label) */
  @Input() ariaLabel = 'Notificaciones';

  /** Tooltip del botón */
  @Input() title = 'Notificaciones';

  /** Emite al hacer click */
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }

  get badgeText(): string {
    return this.badge > 99 ? '99+' : String(this.badge);
  }

  get badgeAria(): string {
    return `Tienes ${this.badge} notificaciones`;
  }
}
