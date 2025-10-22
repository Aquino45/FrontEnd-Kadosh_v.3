import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type EyeRow = {
  ojo: 'OD' | 'OI';
  esf: string | null;
  cil: string | null;
  eje: string | null;
  dip: string | null;
  av:  string | null;
};

@Component({
  standalone: true,
  selector: 'app-new-historial',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-historial.html',
  styleUrls: ['./new-historial.css']
})
export class NewHistorialComponent {
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    fecha: [new Date().toISOString().slice(0, 10), Validators.required],
    paciente: ['', [Validators.required, Validators.minLength(2)]],
    telefono: [''],
    edad: [''],
    dni: [''],

    // tablas
    lejos: this.fb.array(this.makeEyeRows()),
    cerca: this.fb.array(this.makeEyeRows()),

    // keratometría
    k_od: [''],
    k_lc: [''],
    k_oi: [''],

    recomendaciones: ['']
  });

  get lejosFA()  { return this.form.get('lejos') as FormArray; }
  get cercaFA()  { return this.form.get('cerca') as FormArray; }

  private makeEyeRows(): FormGroup[] {
    const rows: EyeRow[] = [
      { ojo: 'OD', esf: null, cil: null, eje: null, dip: null, av: null },
      { ojo: 'OI', esf: null, cil: null, eje: null, dip: null, av: null }
    ];
    return rows.map(r => this.fb.group({
      ojo: [{ value: r.ojo, disabled: true }],
      esf: [r.esf],
      cil: [r.cil],
      eje: [r.eje],
      dip: [r.dip],
      av:  [r.av],
    }));
  }

  // helpers
  numberInputAttrs = {
    inputmode: 'decimal',
    pattern: '-?\\d+(\\.\\d{0,2})?',
  };

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Enviar a tu API / servicio
    const payload = this.form.getRawValue(); // incluye 'ojo' deshabilitado
    console.log('Historial guardado:', payload);
    this.close.emit(); // cerrar tras guardar (opcional)
  }

  cancel() { this.close.emit(); }
}
