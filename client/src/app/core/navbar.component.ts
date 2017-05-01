import { RestService } from './services/feathers.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    a.nav-item {
      color: black;
    }
  `]
})
export class NavbarComponent implements OnInit {
  public isActive: boolean = false;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onMobileNavClick(): void {
    this.isActive ? this.isActive = false : this.isActive = true;
    console.log(this.isActive); 
  }

}
