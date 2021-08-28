import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SerchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];
  private apiKey: string = 'cDKD8isMrxwhdNDEXEvNXiyL9vDz5gjm';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  
  public resultados: Gif[] = [];

  constructor(private http: HttpClient) {
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    }
  }

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string = '') {
    
    const url = `${this.servicioUrl}/search`;
    
    if (!this._historial.includes(query.toLocaleLowerCase())) {
      query = query.trim().toLowerCase();
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10') 
    .set('q', query);
    
    

    this.http.get<SerchGifsResponse>(url, {params}).subscribe((response) => {
      this.resultados = response.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
  }
}
