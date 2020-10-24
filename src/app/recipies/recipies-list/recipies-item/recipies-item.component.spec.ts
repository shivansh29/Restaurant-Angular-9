import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipiesItemComponent } from './recipies-item.component';

describe('RecipiesItemComponent', () => {
  let component: RecipiesItemComponent;
  let fixture: ComponentFixture<RecipiesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipiesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipiesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
