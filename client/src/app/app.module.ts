import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {ApiHelper} from '../services/apiHelper';
import {UserDao} from '../services/dao/user.dao';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ApiCallFactory} from '../services/apiCallFactory';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TitleMessageDialogModule} from '../shared-client/dialog/title-message-dialog/title-message-dialog.module';
import {LoginModule} from './login/login.module';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from '../shared-client/material/material.module';
import {PortalModule} from './portal/portal.module';
import {PrimeNgModule} from '../shared-client/primeng/prime-ng.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TitleMessageDialogModule,
    LoginModule,
    MaterialModule,
    PortalModule,
    PrimeNgModule,
  ],
  providers: [
    ApiHelper,
    HttpClient,
    ApiCallFactory,
    UserDao,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
