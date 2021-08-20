import { Component, ViewChild, AfterViewInit, EventEmitter, Output } from "@angular/core";
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";
 
@Component({
  selector: 'app-bar-code-reader',
  template: `
    <barcode-scanner-livestream
      type="code_128"
      (valueChanges)="onValueChanges($event)"
      (started)="(onStarted)"
    ></barcode-scanner-livestream>
    <div [hidden]="!barcodeValue">
      {{ barcodeValue }}
    </div>
  `,
})

export class BarCodeReaderComponent implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner!: BarcodeScannerLivestreamComponent;
 
  @Output() returnedData = new EventEmitter<string>();

  
  barcodeValue: any;
 
  ngAfterViewInit() {
    this.barcodeScanner.start();
  }
 
  onValueChanges(result: { codeResult: { code: any; }; }) {
    this.barcodeValue = result.codeResult.code;
    this.returnedData.emit(this.barcodeValue)
  }
 
  onStarted(started: any) {
    console.log(started);
  }
}