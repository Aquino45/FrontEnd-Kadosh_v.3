import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../../services/usuarios.service';
import { ToastService } from '../../../shared/toast/toast.service'; // ajusta la ruta a tu toast.service

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
  private usuariosSvc = inject(UsuariosService);
  private toast = inject(ToastService);

  private readonly phoneRegex = /^\d{9}$/;
  private readonly dniRegex = /^\d{8}$/;

  readonly defaultAvatar = 'assets/Images/default_user_profile.png';

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
    dni: ['', [Validators.required, Validators.pattern(this.dniRegex)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    foto: [null]
  });

  previewUrl: string = this.defaultAvatar;

  get f() { return this.form.controls; }
  get invalid() { return this.form.invalid; }

  cancel() {
    this.close.emit();
  }

  onPickPhoto(input: HTMLInputElement) {
    input.click();
  }

  onPhotoSelected(ev: Event) {
    const file = (ev.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.toast.warning('El archivo seleccionado no es una imagen válida.');
      return;
    }

    this.form.patchValue({ foto: file });
    const reader = new FileReader();
    reader.onload = () => (this.previewUrl = String(reader.result));
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

  // 🚀 Enviar datos al backend
  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.scrollToFirstError();
      return;
    }

    const val = this.form.value;
    const imagenUrl =
      this.previewUrl && this.previewUrl !== this.defaultAvatar ? this.previewUrl : null;

    const payload = {
      nombre: val.nombre,
      apellido: val.apellido,
      email: val.email || null,
      telefono: val.telefono,
      dni: val.dni,
      password: val.password,
      imagenUrl
    };

    try {
      const resp = await this.usuariosSvc.register(payload);

      // ✅ usa solo el mensaje del backend si existe
      const msg = resp?.message;

      if (resp?.success) {
        if (msg) this.toast.success(msg);   // <-- evita pasar undefined
        this.close.emit();
        this.router.navigate(['/admin/clientes']);
      } else {
        if (msg) this.toast.error(msg);     // <-- evita pasar undefined
      }

    } catch (err: any) {
      // Si el backend devolvió mensaje de error, muéstralo
      const backendMsg: string | undefined = err?.error?.message;
      if (backendMsg) {
        this.toast.error(backendMsg);
      } else {
        // opcional: un fallback genérico si no viene nada
        this.toast.error('Error inesperado en el registro.');
      }
    }

  }
}
