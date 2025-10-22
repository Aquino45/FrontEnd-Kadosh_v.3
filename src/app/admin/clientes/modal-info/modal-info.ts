<<<<<<< HEAD
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-info',
  imports: [],
  templateUrl: './modal-info.html',
  styleUrl: './modal-info.css'
})
export class ModalInfo {
=======
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type InfoClient = {
  id?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  dni?: string;
  created_at?: string;
  foto?: string;
};

@Component({
  standalone: true,
  selector: 'app-modal-info',
  imports: [CommonModule],
  templateUrl: './modal-info.html',
  styleUrls: ['./modal-info.css']
})
export class ModalInfoComponent {
  @Input() open = false;
  @Input() client: InfoClient | null = null;
  @Output() close = new EventEmitter<void>();

  fotoUrl: string = ' ';

  ngOnChanges(): void {
    this.fotoUrl = this.client?.foto && this.client.foto.trim() !== ''
      ? this.client.foto
      : '/assets/Images/default_user_profile.png';
  }

  onClose() {
    this.close.emit();
  }

>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789

}
