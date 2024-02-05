import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FooterComponent } from './common/footer/footer.component';
import { NavigationComponent } from './common/navigation/navigation.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HomeComponent } from './pages/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestInterceptor } from './interceptor/token.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatTooltipModule
  ],
  providers: [ [{provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}] ],
  bootstrap: [AppComponent]
})
export class AppModule { }
