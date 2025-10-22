import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { InfoClient, ModalInfoComponent } from './modal-info/modal-info';
import { NewClientComponent } from './new-client/new-client';


type Client = { id: number; name: string };

@Component({
  standalone: true,
  selector: 'app-clientes',
  imports: [CommonModule, ModalInfoComponent,NewClientComponent],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})


export class ClientesComponent {
  isNewClientOpen = false;
  private location = inject(Location);



  clients: InfoClient[] = [
    {
      id: 1,
      nombre: 'Juan José',
      apellido: 'Jimenez Arreaga',
      email: 'juan.jimenez@example.com',
      telefono: '+51 987 654 321',
      dni: '12345678',
      created_at: '2024-03-15',
      foto: 'https://i.ibb.co/2SgC7yR/avatar1.png'
    },
    {
      id: 2,
      nombre: 'María Esther',
      apellido: 'Luján Pérez',
      email: 'maria.lujan@example.com',
      telefono: '+51 912 345 678',
      dni: '87654321',
      created_at: '2024-04-10',
      foto: 'https://i.ibb.co/7gDdZ3y/avatar2.png'
    },
    {
      id: 3,
      nombre: 'Valeria Teresa',
      apellido: 'Cuba Estuario',
      email: 'valeria.cuba@example.com',
      telefono: '+51 956 789 123',
      dni: '45678912',
      created_at: '2024-05-02',
      foto: 'null'
    },

    {
      id: 4,
      nombre: 'Cristhian David',
      apellido: 'Avila Torres',
      email: 'avila@gmailcom',
      telefono: '+51 983 456 789',
      dni: '7146119715',
      created_at: '2025-10-15',
      foto: 'null'
    }
  ];

  // 🔹 estado del modal
  isConfirmOpen = false;
  clientToDelete: InfoClient | null = null;
  isInfoOpen = false;
  clientToView: InfoClient | null = null;
  showForm = false;

  goBack() { this.location.back(); }

  // abrir modal
  openDeleteConfirm(client: InfoClient) {
    this.clientToDelete = client;
    this.isConfirmOpen = true;
    // foco al botón cancelar por accesibilidad
    queueMicrotask(() => {
      const el = document.getElementById('confirm-cancel');
      el?.focus();
    });
  }

  // cerrar modal (sin eliminar)
  closeConfirm() {
    this.isConfirmOpen = false;
    this.clientToDelete = null;
  }

  // confirmar eliminación
  confirmDelete() {
    if (!this.clientToDelete) return;
    this.clients = this.clients.filter(c => c.id !== this.clientToDelete!.id);
    this.closeConfirm();
  }

  openInfo(client: InfoClient) {
    this.clientToView = client;
    this.isInfoOpen = true;
  }

  closeInfo() {
    this.isInfoOpen = false;
    this.clientToView = null;
  }

  newClient() {
    this.showForm = true;
    // opcional: llevar al tope
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  }

  closeForm() {
    this.showForm = false;
  }
}

