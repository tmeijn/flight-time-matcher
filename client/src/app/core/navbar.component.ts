import { fadeInAnimation } from '../shared/animations';
import { Observable } from 'rxjs/Observable';
import { State, isAuthenticated } from '../app.reducers';
import { Store } from '@ngrx/store';
import { FeathersRestService, FeathersSocketService } from './services/feathers.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    a.nav-item {
      color: black;
    }
  `],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]' : '' }
})
export class NavbarComponent implements OnInit {

  /** Holds the state of the hamburger menu */
  public isActive: boolean = false;

  /** holds the state of authentication. */
  public isAuthenticated: Observable<boolean>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  /**
   * Changes the state of the hamburger menu on mobile viewports.
   */
  onMobileNavClick(): void {
    this.isActive ? this.isActive = false : this.isActive = true;
  }

  logout() {
  }

}
