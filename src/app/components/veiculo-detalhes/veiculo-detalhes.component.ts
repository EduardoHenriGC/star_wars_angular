import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicle, CharacterData, FilmData } from 'src/app/interfaces/Detalhes';

@Component({
  selector: 'app-veiculo-detalhes',
  templateUrl: './veiculo-detalhes.component.html',
  styleUrls: ['./veiculo-detalhes.component.scss']
})
export class VeiculoDetalhesComponent implements OnInit {
  vehicle: Vehicle = {
    name: "",
    model: "",
    manufacturer: "",
    cost_in_credits: "",
    length: "",
    max_atmosphering_speed: "",
    crew: "",
    passengers: "",
    cargo_capacity: "",
    consumables: "",
    vehicle_class: "",
    films: [],
    pilots: []
  };
  filmDetails: FilmData[] = [];
  pilotsDetails: CharacterData[] = [];
  dataLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { this.vehicle = {} as Vehicle; }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.vehicle = data['vehicle'];

      forkJoin([
        this.loadFilmDetails(),
        this.loadResidentsDetails(),
      ]).subscribe(() => {
        this.dataLoaded = true;
      });
    });

  }

  extractId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }

  // Carrega detalhes dos filmes
  loadFilmDetails(): Observable<FilmData[]> {
    const filmObservables = this.vehicle.films.map((filmUrl: string) => {
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
    const residentObservables = this.vehicle.pilots.map((residentUrl: string) => {
      const residentId = this.extractId(residentUrl);
      return this.apiService.getCharactersDetailsByUrl(residentUrl).pipe(
        map((residentData: CharacterData) => {
          residentData.id = residentId;
          this.pilotsDetails.push(residentData);
          return residentData as CharacterData;
        })
      );
    });

    return forkJoin(residentObservables);
  }
}
