import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesShopComponent } from './services-shop.component';

describe('ServicesShopComponent', () => {
  let component: ServicesShopComponent;
  let fixture: ComponentFixture<ServicesShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
