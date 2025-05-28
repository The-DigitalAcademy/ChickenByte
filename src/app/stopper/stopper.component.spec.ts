import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopperComponent } from './stopper.component';

describe('StopperComponent', () => {
  let component: StopperComponent;
  let fixture: ComponentFixture<StopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
