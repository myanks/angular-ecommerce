import { TestBed } from '@angular/core/testing';

import { AngularShopFormService } from './angular-shop-form.service';

describe('AngularShopFormService', () => {
  let service: AngularShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
