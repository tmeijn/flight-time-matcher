import { FeathersRestService } from './services/feathers.service';
import { AuthService } from './services/auth.service';
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
    private _router: Router,
    public _auth: AuthService,
    public feathers: FeathersRestService
  ) { }

  ngOnInit() {
  }

  onMobileNavClick(): void {
    this.isActive ? this.isActive = false : this.isActive = true;
    console.log(this.isActive); 
  }

  logout() {
    this.feathers.feathersApp.logout();
  }

}
