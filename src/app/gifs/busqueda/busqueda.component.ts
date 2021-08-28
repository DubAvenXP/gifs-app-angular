import { query } from '@angular/animations';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // Operador para asegurarse que el obj no sera nulo -> ! <-
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  
  constructor(private gifsService: GifsService) { }

  // buscar( termino: string ) {
  //   if (termino.trim().length === 0) {
  //     return;
  //   }
  // }

  buscar() {
    const termino = this.txtBuscar.nativeElement.value;
    
    if (termino.trim().length === 0) {
      return;
    }
    this.gifsService.buscarGifs(termino);
    this.txtBuscar.nativeElement.value = ''; // Limpiar el input
  }

}
