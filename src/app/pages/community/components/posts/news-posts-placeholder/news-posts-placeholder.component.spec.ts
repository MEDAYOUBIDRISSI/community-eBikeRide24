import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPostsPlaceholderComponent } from './news-posts-placeholder.component';

describe('NewsPostsPlaceholderComponent', () => {
  let component: NewsPostsPlaceholderComponent;
  let fixture: ComponentFixture<NewsPostsPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsPostsPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPostsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
