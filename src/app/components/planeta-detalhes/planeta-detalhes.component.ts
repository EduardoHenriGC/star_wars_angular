import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Planet, FilmData, CharacterData } from 'src/app/interfaces/Detalhes';

@Component({
  selector: 'app-planeta-detalhes',
  templateUrl: './planeta-detalhes.component.html',
  styleUrls: ['./planeta-detalhes.component.scss']
})
export class PlanetaDetalhesComponent implements OnInit {
  planet: Planet = {
    name: "",
    rotation_period: "",
    orbital_period: "",
    diameter: "",
    climate: "",
    gravity: "",
    terrain: "",
    surface_water: "",
    population: "",
    films: [],
    residents: []
  };
  filmDetails: FilmData[] = [];
  residentsDetails: CharacterData[] = [];
  dataLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.planet = {} as Planet;
  }


  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.planet = data['planet'];

      forkJoin([
        this.loadFilmDetails(),
        this.loadResidentsDetails(),
      ]).subscribe(() => {
        this.dataLoaded = true;
      });
    });

  }

  //Carrega os dados dos filmes
  loadFilmDetails(): Observable<FilmData[]> {
    const filmObservables = this.planet.films.map((filmUrl: string) => {
      const filmId = this.extractId(filmUrl);
      return this.apiService.getFilmDetailsByUrl(filmUrl).pipe(
        map((filmData: any) => {
          filmData.id = filmId;
          this.filmDetails.push(filmData);
          return filmData as FilmData;
        })
      );
    });

    return forkJoin(filmObservables);
  }

  //Carrega os dados dos personagens
  loadResidentsDetails(): Observable<CharacterData[]> {
    const residentObservables = this.planet.residents.map((residentUrl: string) => {
      const residentId = this.extractId(residentUrl);
      return this.apiService.getCharactersDetailsByUrl(residentUrl).pipe(
        map((residentData: CharacterData) => {
          residentData.id = residentId;
          this.residentsDetails.push(residentData);
          return residentData as CharacterData;
        })
      );
    });

    return forkJoin(residentObservables);
  }

  extractId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }
}
