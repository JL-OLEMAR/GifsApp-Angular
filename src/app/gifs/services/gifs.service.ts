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
  public resultados: Gif[] = []

  get historial (): string[] {
    return [...this._historial]
  }

  constructor (private readonly http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [] // eslint-disable-line
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [] // eslint-disable-line
  }

  buscarGifs (query: string = ''): void {
    query = query.trim().toLocaleLowerCase()

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=9fpFIiaXW0e3mGnVuAtZjlVyqKmqp0m8&q=${query}&limit=10`)
      .subscribe((resp) => {
        console.log(resp.data)
        this.resultados = resp.data
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
  }
}
