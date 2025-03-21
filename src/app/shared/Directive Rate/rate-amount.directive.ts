import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appRateAmount]'
})
export class RateAmountDirective {
  private readonly maxLength: number = 10; 

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target.value']) onInput(value: string): void {
    let formattedValue = this.formatRate(value);

    if (formattedValue.length > this.maxLength) {
      formattedValue = formattedValue.slice(0, this.maxLength);
    }

    this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
  }

  private formatRate(value: string): string {
    const numericValue = value.replace(/[^0-9.]/g, '');

    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts[1];
    }
    if (parts[1]) {
      parts[1] = parts[1].substring(0, 2);
    }

    return parts.join('.');
  }
}
