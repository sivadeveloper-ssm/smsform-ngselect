import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import {DataService} from './services/dataservice';
import {HttpClientModule} from '@angular/common/http';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ArrayClass } from './Class/ArrayClass';

//Third party modules
import {NgxLoadingModule} from 'ngx-loading';
import {AppBootstrapModule} from './Shared/app-bootstrap.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppBootstrapModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule
  ],
  providers: [
    DataService,
    ArrayClass
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
