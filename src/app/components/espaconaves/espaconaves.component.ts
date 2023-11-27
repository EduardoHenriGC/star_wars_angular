import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuData } from 'src/app/interfaces/menuData';


@Component({
  selector: 'app-espaconaves',
  templateUrl: './espaconaves.component.html',
  styleUrls: ['./espaconaves.component.scss']
})
export class EspaconavesComponent implements OnInit {

  starshipsList: MenuData[] = [];
  filteredStarshipsList: MenuData[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  showStarshipsDetails(starship: MenuData): void {
    // Pegando o id pela url
    const starshipId = starship.url.split('/').filter(Boolean).pop();
    this.router.navigate(['/espaconave', starshipId]);
  }

  ngOnInit(): void {
    this.http.get<{ results: MenuData[] }>('https://swapi.dev/api/starships')
      .subscribe(data => {
        this.starshipsList = data.results;
        // Inicializa a lista filtrada com a lista completa no início
        this.filteredStarshipsList = this.starshipsList;
      });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredStarshipsList = this.starshipsList; // Garante que a lista completa seja exibida ao limpar a pesquisa
  }

  onSearch(): void {
    // Atualiza a lista filtrada com base na string de pesquisa
    this.filteredStarshipsList = this.starshipsList.filter(starship =>
      starship.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Função chamada ao limpar o input
  onClear(): void {
    // Volta a exibir a lista completa
    this.filteredStarshipsList = this.starshipsList;
    // Limpa a string de pesquisa
    this.searchTerm = '';
  }
}
