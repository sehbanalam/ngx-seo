import { TestBed } from '@angular/core/testing';

import { NgxSeoService } from './ngx-seo.service';

describe('NgxSeoService', () => {
  let service: NgxSeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
