import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBlogs } from './my-blogs';
import { provideRouter } from '@angular/router';

describe('MyBlogs', () => {
  let component: MyBlogs;
  let fixture: ComponentFixture<MyBlogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBlogs],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyBlogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
