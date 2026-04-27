import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantesCard } from './restaurantes-card';

describe('RestaurantesCard', () => {
  let component: RestaurantesCard;
  let fixture: ComponentFixture<RestaurantesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantesCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantesCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
