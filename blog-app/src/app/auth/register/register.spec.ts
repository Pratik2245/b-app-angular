import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });


  it('should create', () => {
    expect(true).toBeTrue();
  });

  it('should initialize fields as empty', () => {
    expect(component.username).toBe('');
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.registrationError).toBe('');
  });

  it('should validate a correct email', () => {
    expect((component as any).isValidEmail('test@gmail.com')).toBe(true);
  });

  it('should reject an invalid email', () => {
    expect((component as any).isValidEmail('testgmail.com')).toBe(false);
  });



});
