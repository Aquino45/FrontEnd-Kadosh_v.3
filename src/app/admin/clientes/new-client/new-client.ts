import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-new-client',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-client.html',
  styleUrls: ['./new-client.css']
})
export class NewClientComponent {
  @Output() close = new EventEmitter<void>();
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly phoneRegex = /^\d{9}$/; // 9 dígitos exactos
  private readonly dniRegex = /^\d{8}$/;  // 8 dígitos exactos

  // avatar por defecto
  readonly defaultAvatar = 'assets/Images/default_user_profile.png';

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
    dni: ['', [Validators.required, Validators.pattern(this.dniRegex)]],
    foto: [null] // guardamos el File o base64 si quieres
  });

  previewUrl: string = this.defaultAvatar;

  // Helpers de template
  get f() { return this.form.controls; }
  get invalid() { return this.form.invalid; }

  // Navegación
  goBack() { history.back(); }
  cancel() {
    this.close.emit();           // ← cierra y vuelve a la lista
  }

  // Manejo de imagen
  onPickPhoto(input: HTMLInputElement) {
    input.click();
  }

  onPhotoSelected(ev: Event) {
    const file = (ev.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // validación simple
    if (!file.type.startsWith('image/')) return;

    this.form.patchValue({ foto: file });
    // preview
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = String(reader.result);
    reader.readAsDataURL(file);
  }

  removePhoto() {
    this.form.patchValue({ foto: null });
    this.previewUrl = this.defaultAvatar;
  }

  private scrollToFirstError() {
    setTimeout(() => {
      const el = document.querySelector(
        'input.ng-invalid, textarea.ng-invalid, select.ng-invalid'
      ) as HTMLElement | null;
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus();
    });
  }

  // Enviar datos
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Aquí integrarías tu servicio HTTP
    const payload = {
      ...this.form.value,
      // si necesitas enviar base64, la tienes en this.previewUrl
    };
    console.log('Cliente a registrar:', payload);

    // Redirige a la lista o muestra toast de éxito
    this.router.navigate(['/admin/clientes']);

    this.close.emit();    // ← cierra el formulario tras enviar
  }


}
