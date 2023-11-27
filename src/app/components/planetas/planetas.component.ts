import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuData } from 'src/app/interfaces/menuData';



@Component({
  selector: 'app-planetas',
  templateUrl: './planetas.component.html',
  styleUrls: ['./planetas.component.scss']
})
export class PlanetasComponent implements OnInit {
  planetList: MenuData[] = [];
  filteredPlanetList: MenuData[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  showPlanetDetails(planet: MenuData): void {
    // Pegando o id pela url
    const planetId = planet.url.split('/').filter(Boolean).pop();
    this.router.navigate(['/planeta', planetId]);
  }

  ngOnInit(): void {
    this.http.get<{ results: MenuData[] }>('https://swapi.dev/api/planets')
      .subscribe(data => {
        this.planetList = data.results;
        // Inicializa a lista filtrada com a lista completa no início
        this.filteredPlanetList = this.planetList;
      });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredPlanetList = this.planetList; // Garante que a lista completa seja exibida ao limpar a pesquisa
  }

  onSearch(): void {
    // Atualiza a lista filtrada com base na string de pesquisa
    this.filteredPlanetList = this.planetList.filter(planet =>
      planet.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Função chamada ao limpar o input
  onClear(): void {
    // Volta a exibir a lista completa
    this.filteredPlanetList = this.planetList;
    // Limpa a string de pesquisa
    this.searchTerm = '';
  }
}
