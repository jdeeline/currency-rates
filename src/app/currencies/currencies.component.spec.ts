import { HttpClientTestingModule } from '@angular/common/http/testing';
import { formatNumber } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { CurrenciesComponent } from './currencies.component';
import { CurrenciesService } from './currencies.service';
import { LoadingDirective } from '../loading.directive';
import { currencyStub } from './currency';

describe('CurrenciesComponent', () => {
  let component: CurrenciesComponent;
  let fixture: ComponentFixture<CurrenciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [CurrenciesComponent, LoadingDirective],
      providers: [CurrenciesService],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrenciesComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call onHintClick and get the exchange amount', () => {
    const amount = 1000;

    component.onHintClick(amount);

    expect(component.exchangeAmount).toBe(amount);
  });

  it('should call convert and get the converted amount', () => {
    const amount = 1000;
    const result = component.convert(amount, currencyStub);

    expect(result).toBe(amount / (currencyStub.rate / currencyStub.nominal));
  });

  it(
    'should render hints',
    waitForAsync(() => {
      const service = fixture.debugElement.injector.get(CurrenciesService);
      const firstHint = component.amountHints[0];
      const formattedHint = formatNumber(firstHint, 'en-US');

      spyOn(service, 'getCurrencies').and.returnValue(of([]));

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(service.getCurrencies).toHaveBeenCalledWith();

        const hintEl = fixture.nativeElement.querySelector('.hint');

        expect(hintEl.textContent.trim()).toBe(formattedHint);
      });
    }),
  );

  it(
    'should render the currency',
    waitForAsync(() => {
      const service = fixture.debugElement.injector.get(CurrenciesService);
      spyOn(service, 'getCurrencies').and.returnValue(of([currencyStub]));

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(service.getCurrencies).toHaveBeenCalledWith();

        const codeEl = fixture.nativeElement.querySelector(
          'table tbody tr:first-child td:first-child',
        );

        expect(codeEl.textContent.trim()).toBe(currencyStub.code);
      });
    }),
  );
});
