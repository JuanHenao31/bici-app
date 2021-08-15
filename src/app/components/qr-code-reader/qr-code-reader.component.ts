import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BarcodeFormat, ResultMetadataType } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-code-reader',
  templateUrl: './qr-code-reader.component.html',
  styleUrls: ['./qr-code-reader.component.css']
})
export class QrCodeReaderComponent implements OnInit {

  @Output() returnedData = new EventEmitter<string>();

  public scannerEnabled: boolean = true;
  public information: string = "";
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];

  @ViewChild(ZXingScannerComponent)
  qrscanner: ZXingScannerComponent = new ZXingScannerComponent();
  
  
  constructor() {
    var qrInput:string = "qrInput";
  }

  ngOnInit(): void {
    console.log("Scanner - Autostart");

    this.qrscanner.enable;
    this.qrscanner.autostart;
    
    console.log("SubscribeToScanner");

    this.qrscanner.scanSuccess.subscribe((result: any) => {
      console.log(result);
    });

  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;  
    this.information = $event;
    this.returnedData.emit(this.information)
  }
  
  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No code information has been detected. Zoom in on a QR code to scan.";
  }

}
