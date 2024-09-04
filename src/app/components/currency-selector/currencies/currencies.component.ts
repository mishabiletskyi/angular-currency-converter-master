import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Currency } from '../../../interface/currency-interface'; // Переконайтеся, що імплементуєте Currency

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['../currency-selector.component.scss']
})
export class CurrenciesComponent {
  @Input() currency!: Currency;
  @Input() selectCurrency!: (currency: Currency) => void;

  public selectCurrencyFunc(currency: Currency): void {
    if (this.selectCurrency) {
      this.selectCurrency(currency);
    }
  }
}
