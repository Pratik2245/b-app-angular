import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { provideRouter } from '@angular/router';
import { Auth } from '../../services/auth';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceSpy: jasmine.SpyObj<Auth>;
  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('Auth', ['login']);
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize values', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.loginError).toBe('');
  });
  it('should have empty login error initially', () => {
    expect(component.loginError).toBe('');
  });

  it('should update email', () => {
    component.email = 'test@gmail.com';

    expect(component.email).toBe('test@gmail.com');
  });

  it('should update password', () => {
    component.password = '123456';

    expect(component.password).toBe('123456');
  });

});
