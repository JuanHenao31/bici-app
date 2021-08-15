import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(private firestore: AngularFirestore) { }

  agregarEmpleado(empleado: any): Promise<any> {
    return this.firestore.collection('reserves').add(empleado);
  }

  getReserves(): Observable<any> {
    return this.firestore.collection('reserves', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  deleteReserve(id: string): Promise<any> {
    return this.firestore.collection('reserves').doc(id).delete();
  }

  getEmpleado(id: string): Observable<any> {
    return this.firestore.collection('reserves').doc(id).snapshotChanges();
  }

  actualizarEmpleado(id: string, data:any): Promise<any> {
    return this.firestore.collection('reserves').doc(id).update(data);
  }

}
