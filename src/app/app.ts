import { Component } from '@angular/core';
import { HomeComponent } from './components/home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent], // Removed RouterOutlet from here
  templateUrl: './app.html', // Ensure this points to your app.html
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'cert-verifier';
}