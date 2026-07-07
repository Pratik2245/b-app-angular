import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogList } from './blog-list';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Blog } from '../../services/blog';

describe('BlogList', () => {
  let component: BlogList;
  let fixture: ComponentFixture<BlogList>;
  const blogServiceMock = {
    normalizeBlog: jasmine.createSpy('normalizeBlog').and.callFake((blog: any) => ({
      ...blog,
      likeCount: Number(blog?.likeCount ?? 0),
      views: Number(blog?.views ?? 0),
      liked: Boolean(blog?.liked),
    })),
    normalizeBlogs: jasmine.createSpy('normalizeBlogs').and.callFake((blogs: any[]) =>
      (Array.isArray(blogs) ? blogs : []).map((blog) => ({
        ...blog,
        likeCount: Number(blog?.likeCount ?? 0),
        views: Number(blog?.views ?? 0),
        liked: Boolean(blog?.liked),
      }))
    ),
    getBlogs: jasmine.createSpy('getBlogs').and.returnValue(
      of([
        {
          _id: '1',
          title: 'Angular',
          liked: false
        }
      ])
    ),

    likeBlog: jasmine.createSpy('likeBlog').and.returnValue(
      of({
        likeCount: 6,
        liked: true
      })
    )
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogList],
      providers: [
        provideRouter([

        ]), {
          provide: Blog,
          useValue: blogServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize blogs array', () => {
    expect(component.blogs.length).toBe(1);
  });

  it('should normalize missing view and like counts', () => {
    expect(component.blogs[0].views).toBe(0);
    expect(component.blogs[0].likeCount).toBe(0);
  });

  it('should load blogs', () => {
    expect(blogServiceMock.getBlogs).toHaveBeenCalled();
  });

  it('should like a blog', () => {

    const blog = component.blogs[0];

    component.toggleLike(blog);

    expect(blogServiceMock.likeBlog).toHaveBeenCalledWith('1');
  });

  it('should update like count', () => {

    const blog = component.blogs[0];

    component.toggleLike(blog);

    expect(blog.likeCount).toBe(6);
  });

  it('should update liked status', () => {

    const blog = component.blogs[0];

    component.toggleLike(blog);

    expect(blog.liked).toBeTrue();
  });

});
