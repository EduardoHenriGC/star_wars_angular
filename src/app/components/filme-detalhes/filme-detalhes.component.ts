import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Film, StarshipData, CharacterData } from 'src/app/interfaces/Detalhes';

@Component({
  selector: 'app-filme-detalhes',
  templateUrl: './filme-detalhes.component.html',
  styleUrls: ['./filme-detalhes.component.scss']
})
export class FilmeDetalhesComponent implements OnInit {
  film: Film = {
    title: "",
    episode_id: 0,
    opening_crawl: "",
    director: "",
    producer: "",
    release_date: "",
    starships: [],
    characters: [],

  };
  starshipDetails: StarshipData[] = [];
  charactersDetails: CharacterData[] = [];
  dataLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
    this.film = {} as Film;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.film = data['film'];

      forkJoin([
        this.loadResidentsDetails(),
        this.loadStarshipDetails(),
      ]).subscribe(() => {
        this.dataLoaded = true;
      });
    });

  }


  extractId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 2];
  }

  //Carrega os dados do espaçonaves
  loadStarshipDetails(): Observable<StarshipData[]> {
    const starshipObservables = this.film.starships.map((starshipUrl: string) => {
      const starshipId = this.extractId(starshipUrl);
      return this.apiService.getStarshipDetailsByUrl(starshipUrl).pipe(
        map((starshipData: StarshipData) => {
          starshipData.id = starshipId;
          this.starshipDetails.push(starshipData);
          return starshipData as StarshipData;
        })
      );
    });

    return forkJoin(starshipObservables);
  }

  //Carrega os dados dos personagens
  loadResidentsDetails(): Observable<CharacterData[]> {
    const characterObservables = this.film.characters.map((characterUrl: string) => {
      const characterId = this.extractId(characterUrl);
      return this.apiService.getCharactersDetailsByUrl(characterUrl).pipe(
        map((characterData: CharacterData) => {
          characterData.id = characterId;
          this.charactersDetails.push(characterData);
          return characterData as CharacterData;
        })
      );
    });

    return forkJoin(characterObservables);
  }

}
