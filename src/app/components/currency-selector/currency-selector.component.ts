import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Currency } from '../../interface/currency-interface';
import { CurrencyServiceComponent } from '../../services/currency-service.component';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: [
    '../../../styles/default.scss',
    './currency-selector.component.scss',
  ],
})
export class CurrencySelectorComponent implements OnInit {
  public currencies;
  public edited = true;
  public selectedCurrency;
  public findCurrency;
  public ignoreFocusOut = false;
  public noResultsFind = false;

  @Input() changeCurrency;
  @Input() selectorId;

  @ViewChild('search_input', { static: false }) search_input;
  @ViewChild('currenciesList') elementCurrenciesList!: ElementRef;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public service: CurrencyServiceComponent
  ) {}

  public valueFinding() {
    this.currencies = this.service
      .getCurrencies()
      .filter(
        (item) =>
          item.name.toLowerCase().includes(this.findCurrency.toLowerCase()) ||
          item.full_name.toLowerCase().includes(this.findCurrency.toLowerCase())
      );

    this.noResultsFind = this.currencies.length == 0;
  }

  selectCurrency = (currency: Currency): void => {
    this.selectedCurrency = currency;
    this.changeCurrency(currency);
    this.hideDropdown();

    localStorage.setItem(this.selectorId, currency.name);
  };

  showDropdown() {
    console.log('showDropdown');
    this.edited = false;
    this.elementCurrenciesList.nativeElement.className =
      'dropdown-menu scrollable-menu show';
  }

  hideDropdown() {
    console.log('hideDropdown');
    this.edited = true;
    this.elementCurrenciesList.nativeElement.className =
      'dropdown-menu scrollable-menu';
  }

  dropClick() {
    this.findCurrency = '';
    this.showDropdown();
    this.changeDetector.detectChanges();
    this.search_input.nativeElement.focus();
    this.valueFinding();
  }

  focusOutInput() {
    if (!this.ignoreFocusOut) this.hideDropdown();
  }

  private selectCurrencyOnStart() {
    let data;
    let localData = localStorage.getItem(this.selectorId);
    if (localData)
      data = this.service
        .getCurrencies()
        .find((element) => element.name == localData);
    if (!data)
      data = this.service
        .getCurrencies()
        .find(
          (element) =>
            element.name == (this.selectorId == 'from' ? 'EUR' : 'USD')
        );
    if (data) this.selectCurrency(data);
  }

  ngAfterViewInit(): void {
    this.selectCurrencyOnStart();
  }

  ngOnInit(): void {
    this.currencies = this.service.getCurrencies();

    this.selectedCurrency = this.service.getCurrencies()[0];
    this.changeCurrency(this.service.getCurrencies()[0]);
  }
}
