export interface CBRResponse {
  Date: string;
  PreviousDate: string;
  PreviousURL: string;
  Timestamp: string;
  Valute: {
    [s: string]: {
      ID: string;
      NumCode: string;
      CharCode: string;
      Nominal: number;
      Name: string;
      Value: number;
      Previous: number;
    };
  };
}

export const cbrResponseStub: CBRResponse = {
  Date: '2022-01-15T11:30:00+03:00',
  PreviousDate: '2022-01-14T11:30:00+03:00',
  PreviousURL: '//www.cbr-xml-daily.ru/archive/2022/01/14/daily_json.js',
  Timestamp: '2022-01-14T23:00:00+03:00',
  Valute: {
    CZK: {
      ID: 'R01760',
      NumCode: '203',
      CharCode: 'CZK',
      Nominal: 10,
      Name: 'Czech Koruna',
      Value: 30,
      Previous: 29.99,
    },
  },
};
