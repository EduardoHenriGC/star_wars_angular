import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuData } from 'src/app/interfaces/menuData';



@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {

  filmList: MenuData[] = [];
  filteredFilmList: MenuData[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  showFilmsDetails(film: MenuData): void {
    // Pegando o id pela url
    const filmsId = film.url.split('/').filter(Boolean).pop();
    this.router.navigate(['/filme', filmsId]);
  }

  ngOnInit(): void {
    this.http.get<{ results: MenuData[] }>('https://swapi.dev/api/films')
      .subscribe(data => {
        this.filmList = data.results;
        // Inicializa a lista filtrada com a lista completa no início
        this.filteredFilmList = this.filmList;
      });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredFilmList = this.filmList; // Garante que a lista completa seja exibida ao limpar a pesquisa
  }

  onSearch(): void {
    // Atualiza a lista filtrada com base na string de pesquisa
    this.filteredFilmList = this.filmList.filter(film =>
      film.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Função chamada ao limpar o input
  onClear(): void {
    // Volta a exibir a lista completa
    this.filteredFilmList = this.filmList;
    // Limpa a string de pesquisa
    this.searchTerm = '';
  }
}
