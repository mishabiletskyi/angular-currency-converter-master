import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CurrenciesComponent } from './components/currency-selector/currencies/currencies.component';
import { FormsModule } from '@angular/forms';
import { CurrencySelectorComponent } from './components/currency-selector/currency-selector.component';
import { CurrencyServiceComponent } from './services/currency-service.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    CurrenciesComponent,
    CurrencySelectorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [CurrencyServiceComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
