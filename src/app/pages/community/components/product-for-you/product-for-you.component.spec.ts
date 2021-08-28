import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductForYouComponent } from './product-for-you.component';

describe('ProductForYouComponent', () => {
  let component: ProductForYouComponent;
  let fixture: ComponentFixture<ProductForYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductForYouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductForYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
