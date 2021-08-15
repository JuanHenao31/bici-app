import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Moudulos
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Componente
import { AppComponent } from './app.component';
import { ListReservesComponent } from './components/list-reserve/list-reserve.component';
import { CreateReserveComponent } from './components/create-reserve/create-reserve.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { QrCodeReaderComponent } from './components/qr-code-reader/qr-code-reader.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  declarations: [
    AppComponent,
    ListReservesComponent,
    CreateReserveComponent,
    NavbarComponent,
    QrCodeReaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ZXingScannerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
