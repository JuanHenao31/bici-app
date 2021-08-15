import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateReserveComponent } from './components/create-reserve/create-reserve.component';
import { ListReservesComponent } from './components/list-reserve/list-reserve.component';
import { QrCodeReaderComponent } from './components/qr-code-reader/qr-code-reader.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-reserves', pathMatch: 'full' },
  { path: 'list-reserves', component: ListReservesComponent },
  { path: 'create-reserve', component: CreateReserveComponent },
  { path: 'editreserve/:id', component: CreateReserveComponent },
  { path: 'qrReader', component: QrCodeReaderComponent },  
  { path: '**', redirectTo: 'list-reserves', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
