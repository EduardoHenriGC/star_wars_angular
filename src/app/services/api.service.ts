import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrlPeople = 'https://swapi.dev/api/people';
    private apiUrlPlanet = 'https://swapi.dev/api/planets';
    private apiUrlFilms = 'https://swapi.dev/api/films';
    private apiUrlEspecies = 'https://swapi.dev/api/species';
    private apiUrlVehicle = 'https://swapi.dev/api/vehicles';
    private apiUrlStarship = 'https://swapi.dev/api/starships';

    constructor(private http: HttpClient) { }

    /////People/////////////////////////////////

    getPersonDetailsById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrlPeople}/${id}`);
    }
    /////Planets/////////////////////////////////
    getPlanetDetailsById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrlPlanet}/${id}`);
    }

    //////////FILMES///////////////////
    getFilmsDetailsById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrlFilms}/${id}`);
    }

    //////////ESPECIES///////////////////
    getEspeciesDetailsById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrlEspecies}/${id}`);
    }

    //////////VEICULOS///////////////////
    getVehicleDetailsById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrlVehicle}/${id}`);
    }


    //////////ESPACONAVES///////////////////
    getStarshipsDetailsById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrlStarship}/${id}`);
    }

    //////////GERAL URL///////////////////
    getCharactersDetailsByUrl(url: string): Observable<any> {
        return this.http.get(url);
    }
    getFilmDetailsByUrl(url: string): Observable<any> {
        return this.http.get(url);
    }

    getStarshipDetailsByUrl(url: string): Observable<any> {
        return this.http.get(url);
    }
    getPlanetDetailsByUrl(url: string): Observable<any> {
        return this.http.get(url);
    }

}
