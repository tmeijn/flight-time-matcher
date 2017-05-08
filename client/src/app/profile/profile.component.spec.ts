import { AuthService } from '../../services/auth.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import { ProfileComponent } from './profile.component';

let profile = {
  user: {
    name: 'Test User',
    email: 'Test Email',
    username: 'Test Email',
    password: 'Test Password'
  }
}

class MockAuthService {
  getProfile() {
    return Observable.of(profile);
  }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      providers: [ 
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: mockRouter },
        FlashMessagesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make a call to the auth service', () => {
    spyOn(component._authService, 'getProfile').and.callThrough();

    component.ngOnInit();

    expect(component._authService.getProfile).toHaveBeenCalled();
  });

  
  it('should set the user object within the component', () => {
    fixture.detectChanges();

    expect(component.user).toEqual(profile.user);
  });
    
});
