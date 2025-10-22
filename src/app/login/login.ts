import { Component } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { ToastService } from '../shared/toast/toast.service'; // ajusta ruta si difiere
=======
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789

@Component({
  selector: 'app-login',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule],
=======
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
<<<<<<< HEAD
  usuario = '';
  contrasena = '';
  recordar = false;
  loading = false;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private toast: ToastService
  ) {}

  async onSubmit() {
    this.loading = true;
    try {
      // Enviamos SIEMPRE al backend (aunque esté vacío) para que el MENSAJE venga del servidor
      const res = await this.usuariosService.login(this.usuario, this.contrasena);
      this.loading = false;

      // Tu backend devuelve 200 sólo cuando success=true
      if (res?.success && res?.token) {
        const storage = this.recordar ? localStorage : sessionStorage;
        storage.setItem('token', res.token);
        if (res.user) storage.setItem('user', JSON.stringify(res.user));

        // Mensaje amigable + podrías mostrar también algo de res.user si quisieras
        this.toast.success('Inicio de sesión correcto', 'Éxito');
        this.router.navigateByUrl('/home-admin');
      } else {
        // Por si algún día devuelves 200 con success=false
        this.toast.error(res?.message ?? 'Ocurrió un problema', 'Alerta');
      }
    } catch (err: any) {
      this.loading = false;
      // Extrae SIEMPRE el mensaje del backend
      const msg = this.extractBackendMessage(err);
      const title = (err?.status === 401 || err?.status === 403) ? 'No autorizado' :
                    (err?.status === 400) ? 'Solicitud inválida' :
                    (err?.status === 0) ? 'Sin conexión' : 'Alerta';
      this.toast.error(msg, title);
    }
  }

  private extractBackendMessage(err: any): string {
    // Casos típicos de HttpErrorResponse
    //  - err.error.message (tu backend lo manda así)
    //  - err.error (string crudo)
    //  - err.statusText / fallback
    if (err?.error?.message) return err.error.message as string;
    if (typeof err?.error === 'string') return err.error;
    if (err?.message && typeof err.message === 'string') return err.message;
    if (err?.statusText) return err.statusText as string;

    // Fallback genérico
    return 'Ocurrió un error al procesar la solicitud.';
  }
=======
  usuario: string = '';
  contrasena: string = '';
  recordar: boolean = false;

  onSubmit() {
    if (this.usuario && this.contrasena) {
      console.log('Formulario Enviado');
      // Aquí puedes manejar la lógica para el login
    } else {
      console.log('Por favor, complete todos los campos');
    }
  }
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789
}
