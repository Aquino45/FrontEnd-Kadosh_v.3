import { Component } from '@angular/core';
<<<<<<< HEAD

@Component({
  selector: 'app-historial-optico',
  imports: [],
  templateUrl: './historial-optico.html',
  styleUrl: './historial-optico.css'
})
export class HistorialOpticoComponent {
=======
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
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789

}
