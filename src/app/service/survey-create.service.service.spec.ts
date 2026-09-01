import { TestBed } from '@angular/core/testing';

import { SurveyCreateServiceService } from './survey-create.service.service';

describe('SurveyCreateServiceService', () => {
  let service: SurveyCreateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyCreateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
