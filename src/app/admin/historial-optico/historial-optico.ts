import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NewHistorialComponent } from './new-historial/new-historial';

@Component({
  selector: 'app-historial-optico',
  standalone: true,
  imports: [CommonModule, NewHistorialComponent],
  templateUrl: './historial-optico.html',
  styleUrls: ['./historial-optico.css']
})
export class HistorialOpticoComponent {
  showForm = false;

  constructor(private location: Location) { }

  goBack() {
    this.location.back();
  }

  openForm() {
    this.showForm = true;
  }
  closeForm() {
    this.showForm = false;
  }

}
