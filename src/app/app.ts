import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { ToastContainerComponent } from './shared/toast/toast-container';
@Component({
  selector: 'app-root',
  standalone: true,              // 👈 necesario en standalone
  imports: [RouterOutlet, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']       // 👈 plural
=======

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
>>>>>>> 659952dedf1050dc250ebbebcabe15ec48363789
})
export class App {
  protected title = 'Kadosh-FrontEnd';
}
