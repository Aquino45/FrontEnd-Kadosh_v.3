import { Component, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar-admin.html',
  styleUrls: ['./search-bar-admin.css']
})
export class SearchBarComponent implements OnDestroy {
  /** Placeholder del input */
  @Input() placeholder = 'Buscar...';
  /** Valor inicial opcional */
  @Input() set value(v: string | null) { if (v !== null) this.q.setValue(v, { emitEvent: false }); }

  /** Dispara cuando se hace click en el botón o Enter */
  @Output() search = new EventEmitter<string>();
  /** Emite cambios de texto con debounce (para autocompletar, filtros en vivo, etc.) */
  @Output() queryChange = new EventEmitter<string>();

  q = new FormControl<string>('', { nonNullable: true });
  private sub?: Subscription;

  constructor() {
    this.sub = this.q.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(val => this.queryChange.emit(val));
  }

  doSearch() { this.search.emit(this.q.value.trim()); }

  onKey(e: KeyboardEvent) {
    if (e.key === 'Enter') this.doSearch();
  }

  clear() {
    this.q.setValue('');
    this.q.markAsPristine();
    this.q.markAsUntouched();
    this.q.updateValueAndValidity({ emitEvent: true });
    this.search.emit('');
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
