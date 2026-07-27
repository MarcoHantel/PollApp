import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourSurveyComponent } from './your-survey.component';

describe('YourSurveyComponent', () => {
  let component: YourSurveyComponent;
  let fixture: ComponentFixture<YourSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourSurveyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
