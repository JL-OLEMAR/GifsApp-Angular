import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { SearchGifsResponse, Gif } from '../interface/gifs.interface'

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private readonly apiKey: string = environment.apiKeySecret
  private _historial: string[] = []

  // TODO: Cambiar el tipo
  public resultados: Gif[] = []

  get historial (): string[] {
    return [...this._historial]
  }

  constructor (private readonly http: HttpClient) {}

  buscarGifs (query: string = ''): void {
    // Convierte los caracteres "buscados" en minúscula
    query = query.trim().toLocaleLowerCase()

    // No inserta gifs ya buscados dentro de la lista
    if (!this._historial.includes(query)) {
      this._historial.unshift(query)

      // Muestra los últimos 10 gifs buscados
      this._historial = this._historial.splice(0, 10)
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=9fpFIiaXW0e3mGnVuAtZjlVyqKmqp0m8&q=${query}&limit=10`)
      .subscribe((resp) => {
        console.log(resp.data)
        this.resultados = resp.data
      })
  }
}
