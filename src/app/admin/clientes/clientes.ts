import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';


type Client = { id: number; name: string };

@Component({
  standalone: true,
  selector: 'app-clientes',
  imports: [CommonModule],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})
export class ClientesComponent {
  private router = inject(Router);
  private location = inject(Location);

  clients: Client[] = [
    { id: 1, name: 'Juan Jose Jimenez Arreaga' },
    { id: 2, name: 'Maria Esther Lujan Perez' },
    { id: 3, name: 'Valeria Teresa Cuba Estuario' }
  ];

  // 🔹 estado del modal
  isConfirmOpen = false;
  clientToDelete: Client | null = null;

  goBack() { this.location.back(); }
  newClient() { this.router.navigate(['/admin/clientes/nuevo']); }

  // abrir modal
  openDeleteConfirm(client: Client) {
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
}