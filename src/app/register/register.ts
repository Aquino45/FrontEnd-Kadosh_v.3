import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  nombre = '';
  apellido = '';
  usuario = '';
  email = '';
  contrasena = '';
  confirmar = '';
  acepto = false;

  onSubmit() {
    if (!this.acepto) {
      alert('Debes aceptar los términos y condiciones.');
      return;
    }

    if (this.contrasena !== this.confirmar) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log('Formulario enviado con éxito:', {
      nombre: this.nombre,
      apellido: this.apellido,
      usuario: this.usuario,
      email: this.email,
      contrasena: this.contrasena
    });

    alert('Registro completado exitosamente ✅');
  }
}
