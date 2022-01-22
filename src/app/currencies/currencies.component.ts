import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrenciesService } from './currencies.service';
import { Currency } from './currency';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
  providers: [CurrenciesService],
})
export class CurrenciesComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;

  amountHints: number[] = [10000, 20000, 50000, 100000, 200000, 500000];

  exchangeAmount?: number;

  currencies: Currency[] = [];

  isLoading: boolean = false;

  constructor(private currenciesService: CurrenciesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.currenciesService
      .getCurrencies()
      .subscribe((data) => {
        this.currencies = data;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onHintClick(amount: number): void {
    this.exchangeAmount = amount;
  }

  convert(amount: number, currency: Currency): number {
    return amount / (currency.rate / currency.nominal);
  }
}
