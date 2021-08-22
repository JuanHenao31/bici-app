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
  titulo = 'Agrega Tu Reserva';
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
      totalValue:[{value: '', disabled: true}, Validators.required],
      commision: ['', Validators.required],
      finalValue: [{value: '', disabled: true}, Validators.required],

    })

    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.createReserve.get('idBikes')?.setValue("Vehiculos")
    this.esEditar();
  }

  recibirDataQR(data: String) {

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

    const date1 = this.createReserve.value.departureTime.toString();
    const date2 = this.createReserve.value.arriveTime.toString();
    const diffInMs = Date.parse(date2) - Date.parse(date1);
    const diffInHours = Math.ceil(diffInMs / 1000 / 60 / 60);

    const totalValue = this.createReserve.value.valuePerHour * this.createReserve.value.amount * diffInHours
    const finalValue = totalValue+this.createReserve.value.commision
    
    console.log(totalValue, finalValue)
    const empleado: any = {

      totalTime : diffInHours,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      amount: this.createReserve.value.amount,
      client: this.createReserve.value.client,
      idBikes: this.createReserve.value.idBikes,
      valuePerHour: this.createReserve.value.valuePerHour,
      documentNumber: this.createReserve.value.documentNumber,
      departureTime: this.createReserve.value.departureTime,
      arriveTime: this.createReserve.value.arriveTime,
      totalValue:totalValue,
      commision: this.createReserve.value.commision,
      finalValue: finalValue,
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

    const date1 = this.createReserve.value.departureTime.toString();
    const date2 = this.createReserve.value.arriveTime.toString();
    const diffInMs = Date.parse(date2) - Date.parse(date1);
    const diffInHours = Math.ceil(diffInMs / 1000 / 60 / 60);

    const totalValue = this.createReserve.value.valuePerHour * this.createReserve.value.amount * diffInHours
    const finalValue = totalValue+this.createReserve.value.commision
    

    const empleado: any = {
      totalTime : diffInHours,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      amount: this.createReserve.value.amount,
      client: this.createReserve.value.client,
      idBikes: this.createReserve.value.idBikes,
      valuePerHour: this.createReserve.value.valuePerHour,
      documentNumber: this.createReserve.value.documentNumber,
      departureTime: this.createReserve.value.departureTime,
      arriveTime: this.createReserve.value.arriveTime,
      totalValue: totalValue,
      commision: this.createReserve.value.commision,
      finalValue: finalValue,
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
      this.titulo = 'Edita Tu Reserva'
      this.loading = true;

      this._reserveService.getEmpleado(this.id).subscribe(data => {
        this.loading = false;

        const departureTime = getConvertedDate(data,'departureTime') 
        const arriveTime = getConvertedDate(data,'arriveTime') 

        console.log(data.payload.data())

        this.createReserve.setValue({


          amount: data.payload.data()['amount'],
          client: data.payload.data()['client'],
          idBikes: data.payload.data()['idBikes'],
          valuePerHour: data.payload.data()['valuePerHour'],
          documentNumber: data.payload.data()['documentNumber'],
          departureTime: departureTime,
          arriveTime: arriveTime,
          totalValue: data.payload.data()['totalValue'],
          commision: data.payload.data()['commision'],
          finalValue: data.payload.data()['finalValue'],


        })
      })
    }
  }

}
function getConvertedDate(param: any, filter : string) {
return new Date(param.payload.data()[filter]['seconds'] * 1000 + param.payload.data()[filter]['nanoseconds'])

}

function cargarDataReserva() {
  throw new Error('Function not implemented.');
}

