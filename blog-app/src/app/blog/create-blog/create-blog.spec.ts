import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CreateBlog } from './create-blog';
import { provideRouter } from '@angular/router';
import { Blog } from '../../services/blog';

describe('CreateBlog', () => {
  let component: CreateBlog;
  let fixture: ComponentFixture<CreateBlog>;
  const blogServiceMock = {
    createBlog: jasmine.createSpy('createBlog').and.returnValue(of({}))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBlog],
      providers: [
        provideRouter([]),
        {
          provide: Blog,
          useValue: blogServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBlog);
    component = fixture.componentInstance;
    component.blogForm = {
      invalid: false,
      form: {
        markAllAsTouched: jasmine.createSpy('markAllAsTouched')
      }
    } as any;
    spyOn(window, 'alert');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize title as empty', () => {
    expect(component.title).toBe('');
  });

  it('should initialize content as empty', () => {
    expect(component.content).toBe('');
  });

  it('should update title', () => {

    component.title = 'Angular Testing';

    expect(component.title).toBe('Angular Testing');

  });
  it('should update content', () => {

    component.content = 'This is my first blog';

    expect(component.content).toBe('This is my first blog');

  });

  // it('should trim title and content', () => {

  //   component.title = '  Angular  ';
  //   component.content = '  Testing  ';

  //   component.createBlog();

  //   expect(blogServiceMock.createBlog).toHaveBeenCalledWith({
  //     title: 'Angular',
  //     content: 'Testing',
  //     coverImage: ''
  //   });

  // });
  // it('should show alert after successful blog creation', () => {

  //   component.title = 'Angular';
  //   component.content = 'Testing';

  //   component.createBlog();

  //   expect(window.alert).toHaveBeenCalledWith('Blog Created');

  // });
});
