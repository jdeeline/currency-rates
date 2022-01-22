import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { httpInterceptorProviders } from '../http-interceptors';
import { LoadingDirective } from '../loading.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingDirective],
  exports: [CommonModule, LoadingDirective, FormsModule, HttpClientModule],
  providers: [httpInterceptorProviders],
})
export class SharedModule {}
