export interface Currency {
  readonly code: string;
  readonly nominal: number;
  readonly name: string;
  readonly rate: number;
  readonly previousRate: number;
}

export const currencyStub: Currency = {
  code: 'CZK',
  nominal: 10,
  name: 'Czech Koruna',
  rate: 30,
  previousRate: 29.99,
};
