import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CBRResponse } from './cbr-response';
import { Currency } from './currency';

export const apiEndpoints = {
  get: 'https://www.cbr-xml-daily.ru/daily_json.js',
};

@Injectable()
export class CurrenciesService {
  constructor(private httpClient: HttpClient) {}

  getCurrencies(): Observable<Currency[]> {
    return this.sendRequest().pipe(map(this.parseResponse));
  }

  sendRequest(): Observable<CBRResponse> {
    return this.httpClient.get<CBRResponse>(apiEndpoints.get);
  }

  parseResponse(response: CBRResponse): Currency[] {
    return Object.values(response.Valute).map((item) => ({
      code: item.CharCode,
      nominal: item.Nominal,
      name: item.Name,
      rate: item.Value,
      previousRate: item.Previous,
    }));
  }
}
