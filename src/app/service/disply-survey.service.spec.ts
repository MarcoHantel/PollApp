import { TestBed } from '@angular/core/testing';

import { DisplySurveyService } from './disply-survey.service';

describe('DisplySurveyService', () => {
  let service: DisplySurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplySurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
