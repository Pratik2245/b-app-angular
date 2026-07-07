import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetail } from './blog-detail';
import { provideRouter } from '@angular/router';

describe('BlogDetail', () => {
  let component: BlogDetail;
  let fixture: ComponentFixture<BlogDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetail],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize comments as empty array', () => {
    expect(component.comments).toEqual([]);
  });

  it('should initialize comment text as empty', () => {
    expect(component.commentText).toBe('');
  });

  it('should estimate read time correctly', () => {

    const text = 'Angular '.repeat(200);

    expect(component.estimateReadTime(text)).toBe(1);

  });

  it('should return 1 minute when content is empty', () => {

    expect(component.estimateReadTime('')).toBe(1);

  });
});
