<<<<<<< HEAD
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

type Item = { icon: string; label: string; link: string };
type SidebarUser = { name: string; email: string; avatarUrl?: string | null; role?: string | null };
=======
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type Item = {
  icon: string;        // nombre del símbolo
  label: string;       // texto visible
  link: string;        // ruta
};
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar-admin.html',
  styleUrls: ['./sidebar-admin.css']
})
<<<<<<< HEAD
export class SidebarAdminComponent implements OnInit {
  @Input() collapsed = false;
  @Output() sidebarToggle = new EventEmitter<boolean>();

  // estado inicial (placeholder)
  user: SidebarUser = {
    name: '—',
    email: '—',
    avatarUrl: null,
    role: null
  };

  primaryItems: Item[] = [
    { icon: 'fa-solid fa-house',   label: 'Inicio',           link: '/home-admin/inicio' },
    { icon: 'fa-solid fa-users',   label: 'Clientes',         link: '/home-admin/clientes' },
    { icon: 'fa-solid fa-history', label: 'Historial Óptico', link: '/home-admin/historial-optico' },
    { icon: 'fa-solid fa-receipt', label: 'Facturación',      link: '/home-admin/facturacion' },
    { icon: 'fa-solid fa-gear',    label: 'Ajustes',          link: '/home-admin/ajustes' },
    { icon: 'fa-solid fa-circle-question', label: 'Ayuda',    link: '/home-admin/ayuda' },
  ];

  bottomItem: Item = { icon: 'fa-solid fa-sign-out-alt', label: 'Cerrar Sesión', link: '/logout' };

  constructor(private usuariosService: UsuariosService) {}

  async ngOnInit() {
    try {
      const resp = await this.usuariosService.me();
      if (resp?.success && resp.data) {
        const d = resp.data;
        this.user = {
          name: `${d.nombre ?? ''} ${d.apellido ?? ''}`.trim(),
          email: d.correo ?? '—',
          avatarUrl: d.imagenUrl ?? null,
          role: d.rol ?? null
        };
      }
    } catch (e) {
      // si el token no existe o expira, deja los placeholders
      console.error('No se pudo obtener /me', e);
    }
  }
}
=======
export class SidebarAdminComponent {
  @Input() collapsed = false;
  @Output() sidebarToggle = new EventEmitter<boolean>();
  user = {
    name: 'Administrador',
    email: 'admin.kadosh@gmail.com',
    avatarUrl: 'https://i.ibb.co/6zKz4gH/Bamse.gif' // Campo para la URL de la imagen del avatar
  };

primaryItems = [
  { icon: 'fa-solid fa-house',   label: 'Inicio',           link: '/home-admin/inicio' },
  { icon: 'fa-solid fa-users',   label: 'Clientes',         link: '/home-admin/clientes' },
  { icon: 'fa-solid fa-history', label: 'Historial Óptico', link: '/home-admin/historial-optico' },
  { icon: 'fa-solid fa-receipt', label: 'Facturación',      link: '/home-admin/facturacion' },
  { icon: 'fa-solid fa-gear',    label: 'Ajustes',          link: '/home-admin/ajustes' },
  { icon: 'fa-solid fa-circle-question', label: 'Ayuda',    link: '/home-admin/ayuda' },
];

  bottomItem: Item = { icon: 'fa-solid fa-sign-out-alt', label: 'Cerrar Sesión', link: '' };
}
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789
