import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Currency } from 'src/app/interface/currency-interface';

@Injectable({
  providedIn: 'root',
})
export class CurrencyServiceComponent {
  private currencies: Currency[] = [];
  private lastUpdate;

  constructor(private http: HttpClient) {}

  public getCurrencies(): Currency[] {
    return this.currencies;
  }

  public getLastUpdate(): string {
    return this.lastUpdate;
  }

  public getCurrenciesObservable(): Observable<Currency[]> {
    if (this.currencies.length > 0) {
      return of(this.currencies);
    } else {
      return this.http.get<any>('https://open.er-api.com/v6/latest/USD').pipe(
        switchMap((data) => {
          this.lastUpdate = data.time_last_update_utc;
          this.currencies = Object.keys(data.rates).map((key) => ({
            rate: data.rates[key],
            full_name: '',
            name: key,
            symbol: '',
          }));

          return this.http
            .get<any>('https://restcountries.com/v3.1/all?fields=currencies')
            .pipe(
              map((countriesData) => {
                countriesData.forEach((country) => {
                  const name = Object.keys(country.currencies)[0];
                  const index = this.currencies.findIndex(
                    (currency) => currency.name === name
                  );
                  if (index !== -1) {
                    this.currencies[index] = {
                      ...this.currencies[index],
                      full_name: country.currencies[name].name,
                      symbol: country.currencies[name].symbol,
                    };
                  }
                });
                return this.currencies;
              }),
              catchError(() => {
                return of([]);
              })
            );
        }),
        catchError(() => {
          return of([]);
        })
      );
    }
  }
}
