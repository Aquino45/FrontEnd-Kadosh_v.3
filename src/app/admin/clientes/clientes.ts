// src/app/pages/admin/clientes/clientes.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { InfoClient, ModalInfoComponent } from './modal-info/modal-info';
import { NewClientComponent } from './new-client/new-client';
import { UsuariosService, ClienteListItemDTO } from '../../../services/usuarios.service';

@Component({
  standalone: true,
  selector: 'app-clientes',
  imports: [CommonModule, ModalInfoComponent, NewClientComponent],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})
export class ClientesComponent implements OnInit {
  private location = inject(Location);
  private usuariosSvc = inject(UsuariosService);

  // estado UI
  isConfirmOpen = false;
  clientToDelete: InfoClient | null = null;
  isInfoOpen = false;
  clientToView: InfoClient | null = null;
  showForm = false;

  // datos
  clients: InfoClient[] = [];
  loading = false;
  loadError = '';

  ngOnInit(): void {
    this.loadClientes();
  }

  async loadClientes() {
    this.loading = true;
    this.loadError = '';
    try {
      const data: ClienteListItemDTO[] = await this.usuariosSvc.listClientes();

      // Mapeo del DTO del back -> modelo que usa tu UI (InfoClient)
      this.clients = (data || []).map((u, idx) => ({
        id: idx + 1,                               // o usa un correlativo visual
        nombre: u.nombre || '',
        apellido: u.apellido || '',
        email: u.email || '',
        telefono: u.telefono || '',
        dni: u.dni || '',
        created_at: u.createdAt,                   // si quieres, formatea la fecha en el template
        foto: u.imagenUrl || 'null',
        // si quieres guardar también el usuarioId real:
        usuarioId: u.usuarioId
      })) as InfoClient[];

    } catch (e: any) {
      console.error('Error cargando clientes:', e);
      this.loadError = e?.error?.message || 'No se pudo cargar la lista de clientes.';
      this.clients = [];
    } finally {
      this.loading = false;
    }
  }

  goBack() { this.location.back(); }

  // Modal eliminar
  openDeleteConfirm(client: InfoClient) {
    this.clientToDelete = client;
    this.isConfirmOpen = true;
    queueMicrotask(() => document.getElementById('confirm-cancel')?.focus());
  }
  closeConfirm() {
    this.isConfirmOpen = false;
    this.clientToDelete = null;
  }
  confirmDelete() {
    if (!this.clientToDelete) return;
    // Aquí iría el DELETE al backend si lo implementas.
    this.clients = this.clients.filter(c => c.id !== this.clientToDelete!.id);
    this.closeConfirm();
  }

  // Modal info
  openInfo(client: InfoClient) {
    this.clientToView = client;
    this.isInfoOpen = true;
  }
  closeInfo() {
    this.isInfoOpen = false;
    this.clientToView = null;
  }

  // Form crear
  newClient() {
    this.showForm = true;
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  }
  closeForm() {
    this.showForm = false;
    // Opcional: refrescar lista al cerrar el form (si acabas de crear uno)
    this.loadClientes();
  }
}
