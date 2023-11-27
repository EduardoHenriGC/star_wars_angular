import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Person, FilmData, StarshipData, HomeworldData } from 'src/app/interfaces/Detalhes';


@Component({
  selector: 'app-pessoa-detalhes',
  templateUrl: './pessoa-detalhes.component.html',
  styleUrls: ['./pessoa-detalhes.component.scss'],
})
export class PessoaDetalhesComponent implements OnInit {
  person: Person = {
    name: '',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
    starships: [],
    films: [],
    homeworld: ''
  };

  filmDetails: FilmData[] = [];
  starshipDetails: StarshipData[] = [];
  homeworldDetails: HomeworldData | undefined;
  dataLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.person = {} as Person; // Inicializando no construtor
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.person = data['person'];

      forkJoin([
        this.loadFilmDetails(),
        this.loadStarshipDetails(),
        this.loadHomeworldDetails(),
      ]).subscribe(() => {
        this.dataLoaded = true;
      });
    });
  }

  //Carrega os dados dos filmes
  loadFilmDetails(): Observable<FilmData[]> {
    const filmObservables = this.person.films.map((filmUrl: string) => {
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

  //Carrega os dados das espaçonaves
  loadStarshipDetails(): Observable<StarshipData[]> {
    const starshipObservables = this.person.starships.map((starshipUrl: string) => {
      const starshipId = this.extractId(starshipUrl);
      return this.apiService.getStarshipDetailsByUrl(starshipUrl).pipe(
        map((starshipData: any) => {
          starshipData.id = starshipId;
          this.starshipDetails.push(starshipData);
          return starshipData as StarshipData;
        })
      );
    });

    return forkJoin(starshipObservables);
  }


  loadHomeworldDetails(): Observable<any> {
    const homeworldUrl = this.person.homeworld;
    const homeworldId = this.extractId(homeworldUrl);

    return this.apiService.getPlanetDetailsByUrl(homeworldUrl).pipe(
      map((homeworldData: any) => {
        const homeworldDetail: HomeworldData = { ...homeworldData, id: homeworldId };
        this.homeworldDetails = homeworldDetail;
      })
    );
  }

  extractId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }
}
