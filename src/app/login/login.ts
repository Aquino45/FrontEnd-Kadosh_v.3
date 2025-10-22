import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
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
}
