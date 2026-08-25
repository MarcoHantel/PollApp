import { TestBed } from '@angular/core/testing';

import { CategoryDropdownService } from './category-dropdown.service';

describe('CategoryDropdownService', () => {
  let service: CategoryDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
