import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSurveysComponent } from './overview-surveys.component';

describe('OverviewSurveysComponent', () => {
  let component: OverviewSurveysComponent;
  let fixture: ComponentFixture<OverviewSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewSurveysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
