import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-list-reserve',
  templateUrl: './list-reserve.component.html',
  styleUrls: ['./list-reserve.component.css']
})
export class ListReservesComponent implements OnInit {
  reserves: any[] = [];

  constructor(private _reserveService: ReserveService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getReserves()
  }

  getReserves() {
    this._reserveService.getReserves().subscribe(data => {
      this.reserves = [];
      data.forEach((element: any) => {
        this.reserves.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.reserves);
    });
  }

  deleteReserve(id: string) {
    this._reserveService.deleteReserve(id).then(() => {
      console.log('Reserva eliminada con exito');
      this.toastr.error('La reserva fue eliminada con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }

}
