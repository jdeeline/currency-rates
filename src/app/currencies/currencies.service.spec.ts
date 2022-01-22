import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { apiEndpoints, CurrenciesService } from './currencies.service';
import { cbrResponseStub } from './cbr-response';
import { currencyStub } from './currency';

describe('CurrenciesService', () => {
  let httpTestingController: HttpTestingController;
  let service: CurrenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrenciesService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CurrenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call sendRequest and get response stub', () => {
    service.sendRequest().subscribe((response) => {
      expect(response).toBe(cbrResponseStub);
    });

    const req = httpTestingController.expectOne(apiEndpoints.get);

    expect(req.request.method).toEqual('GET');

    req.flush(cbrResponseStub);

    httpTestingController.verify();
  });

  it('should call parseResponse and get currency list', () => {
    const result = service.parseResponse(cbrResponseStub);

    expect(result).toEqual([currencyStub]);
  });

  it('should call getCurrencies and get currency list', () => {
    spyOn(service, 'sendRequest').and.returnValue(of(cbrResponseStub));

    service.getCurrencies().subscribe((data) => {
      expect(service.sendRequest).toHaveBeenCalledWith();
      expect(data).toEqual([currencyStub]);
    });
  });
});
