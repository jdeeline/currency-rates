import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CurrenciesRoutingModule } from './currencies-routing.module';
import { CurrenciesComponent } from './currencies.component';

@NgModule({
  declarations: [CurrenciesComponent],
  imports: [SharedModule, CurrenciesRoutingModule],
})
export class CurrenciesModule {}
