import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Species, FilmData, CharacterData } from 'src/app/interfaces/Detalhes';


@Component({
  selector: 'app-especie-detalhes',
  templateUrl: './especie-detalhes.component.html',
  styleUrls: ['./especie-detalhes.component.scss']
})
export class EspecieDetalhesComponent implements OnInit {
  specie: Species = {
    name: "",
    classification: "",
    designation: "",
    average_height: "",
    skin_colors: "",
    hair_colors: "",
    eye_colors: "",
    average_lifespan: "",
    homeworld: "",
    language: "",
    films: [],
    people: []
  };
  filmDetails: any[] = [];
  personDetails: any[] = [];
  homeworldDetails: any;
  dataLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,

  ) {
    this.specie = {} as Species;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.specie = data['specie'];

      forkJoin([
        this.loadFilmDetails(),
        this.loadResidentsDetails(),
        this.loadHomeworldDetails()
      ]).subscribe(() => {
        this.dataLoaded = true;
      });
    });

  }


  extractId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }

  //Carrega os dados dos filmes
  loadFilmDetails(): Observable<FilmData[]> {
    const filmObservables = this.specie.films.map((filmUrl: string) => {
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
    const residentObservables = this.specie.people.map((residentUrl: string) => {
      const residentId = this.extractId(residentUrl);
      return this.apiService.getCharactersDetailsByUrl(residentUrl).pipe(
        map((residentData: CharacterData) => {
          residentData.id = residentId;
          this.personDetails.push(residentData);
          return residentData as CharacterData;
        })
      );
    });

    return forkJoin(residentObservables);
  }

  // Carrega detalhes do planeta natal
  loadHomeworldDetails(): Observable<any> {
    return this.apiService.getPlanetDetailsByUrl(this.specie.homeworld).pipe(
      map((homeworldData: any) => {
        this.homeworldDetails = homeworldData;
      })
    );
  }
}
