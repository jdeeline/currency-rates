import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appLoading]',
})
export class LoadingDirective {
  @Input('appLoading') state: boolean = false;

  @HostBinding('class.is-loading') get isLoading() {
    return this.state;
  }
}
