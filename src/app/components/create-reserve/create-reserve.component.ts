import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-create-reserve',
  templateUrl: './create-reserve.component.html',
  styleUrls: ['./create-reserve.component.css']
})
export class CreateReserveComponent implements OnInit {

  createReserve: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Reserva';
  public page: number;
  public pageSize: number;
  
  constructor(private fb: FormBuilder,
    private _reserveService: ReserveService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {

      this.page = 1;
      this.pageSize = 5;

    this.createReserve = this.fb.group({

      amount: ['', Validators.required],
      client: ['', Validators.required],
      idBikes: ['', Validators.required],
      valuePerHour: ['', Validators.required],
      documentNumber: ['', Validators.required],
      departureTime: ['', Validators.required],
      arriveTime: ['', Validators.required],
      totalValue: ['', Validators.required],
      commision: ['', Validators.required],
      finalValue: ['', Validators.required],

    })

    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.createReserve.get('idBikes')?.setValue("Vehiculos")
    this.esEditar();
  }

  recibirDataQR(data: String) {

    console.log(data + "  " + this.createReserve.get('idBikes')?.value.includes(data))

    if (!this.createReserve.get('idBikes')?.value.includes(data)) {

      if (this.createReserve.get('idBikes')?.value.includes("Vehiculos")) {
        this.createReserve.get('idBikes')?.setValue('')
      }
      const vehicles = this.createReserve.get('idBikes')?.value + "  " + data
      this.createReserve.get('idBikes')?.setValue(vehicles)
    }


  }

  agregarEditarEmpleado() {
    this.submitted = true;

    if (this.createReserve.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }

  }

  agregarEmpleado() {
    const empleado: any = {

      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      amount: this.createReserve.value.amount,
      client: this.createReserve.value.client,
      idBikes: this.createReserve.value.idBikes,
      valuePerHour: this.createReserve.value.valuePerHour,
      documentNumber: this.createReserve.value.documentNumber,
      departureTime: this.createReserve.value.departureTime,
      arriveTime: this.createReserve.value.arriveTime,
      totalValue: this.createReserve.value.totalValue,
      commision: this.createReserve.value.commision,
      finalValue: this.createReserve.value.finalValue,


    }

    this.loading = true;
    this._reserveService.agregarEmpleado(empleado).then(() => {
      this.toastr.success('La reserva fue registrada con exito!', 'Reserva Registrada', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-reserves']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarEmpleado(id: string) {

    const empleado: any = {
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      amount: this.createReserve.value.amount,
      client: this.createReserve.value.client,
      idBikes: this.createReserve.value.idBikes,
      valuePerHour: this.createReserve.value.valuePerHour,
      documentNumber: this.createReserve.value.documentNumber,
      departureTime: this.createReserve.value.departureTime,
      arriveTime: this.createReserve.value.arriveTime,
      totalValue: this.createReserve.value.totalValue,
      commision: this.createReserve.value.commision,
      finalValue: this.createReserve.value.finalValue,
    }

    this.loading = true;

    this._reserveService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito', 'Empleado modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-reserves']);
    })
  }


  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Reserva'
      this.loading = true;

      this._reserveService.getEmpleado(this.id).subscribe(data => {
        this.loading = false;


        this.createReserve.setValue({

          amount: data.payload.data()['amount'],
          client: data.payload.data()['client'],
          idBikes: data.payload.data()['idBikes'],
          valuePerHour: data.payload.data()['valuePerHour'],
          documentNumber: data.payload.data()['documentNumber'],
          departureTime: data.payload.data()['departureTime'],
          arriveTime: data.payload.data()['arriveTime'],
          totalValue: data.payload.data()['totalValue'],
          commision: data.payload.data()['commision'],
          finalValue: data.payload.data()['finalValue'],


        })
      })
    }
  }

}
