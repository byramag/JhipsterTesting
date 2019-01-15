import { Component } from '@angular/core';
import { NullAstVisitor } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaManagementApp';
  toggleLoginHTML = true;
  toggleApplicationHTML = false;

  constructor() {
    this.toggleLoginHTML = true;
  }

  validateLogin() {
    this.toggleLoginHTML = false; // Changes DOM, logs user in
  }

  toggleApplication() {
    this.toggleApplicationHTML = true;
  }

}
