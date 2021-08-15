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

  constructor(private fb: FormBuilder,
    private _empleadoService: ReserveService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {

    this.createReserve = this.fb.group({
      nameOfClient: ['', Validators.required],
      idBike: ['', Validators.required],
      documento: ['', Validators.required],
      total: ['', Validators.required]
    })

    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
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
      nameOfClient: this.createReserve.value.nameOfClient,
      idBike: this.createReserve.value.idBike,
      documento: this.createReserve.value.documento,
      total: this.createReserve.value.total,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this.loading = true;
    this._empleadoService.agregarEmpleado(empleado).then(() => {
      this.toastr.success('El empleado fue registrado con exito!', 'Empleado Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-empleados']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarEmpleado(id: string) {

    const empleado: any = {
      nameOfClient: this.createReserve.value.nameOfClient,
      apellido: this.createReserve.value.apellido,
      documento: this.createReserve.value.documento,
      salario: this.createReserve.value.salario,      
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito', 'Empleado modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-empleados']);
    })
  }


  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Reserva'
      this.loading = true;
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        this.loading = false;


        this.createReserve.setValue({
          nameOfClient: data.payload.data()['nameOfClient'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        })
      })
    }
  }

}
