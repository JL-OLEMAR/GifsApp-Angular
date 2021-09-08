import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = []

  get historial (): string[] {
    return [...this._historial]
  }

  buscarGifs (query: string = ''): void {
    // Convierte los caracteres "buscados" en minúscula
    query = query.trim().toLocaleLowerCase()

    // No inserta gifs ya buscados dentro de la lista
    if (!this._historial.includes(query)) {
      this._historial.unshift(query)

      // Muestra los últimos 10 gifs buscados
      this._historial = this._historial.splice(0, 10)
    }

    console.log(this._historial)
  }
}
