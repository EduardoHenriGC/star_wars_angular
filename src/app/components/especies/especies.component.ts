import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuData } from 'src/app/interfaces/menuData';


@Component({
  selector: 'app-especies',
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.scss']
})
export class EspeciesComponent implements OnInit {

  speciesList: MenuData[] = [];
  filteredSpeciesList: MenuData[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  showPersonDetails(specie: MenuData): void {
    // Pegando o id pela url
    const specieId = specie.url.split('/').filter(Boolean).pop();
    this.router.navigate(['/especie', specieId]);
  }

  ngOnInit(): void {
    this.http.get<{ results: MenuData[] }>('https://swapi.dev/api/species')
      .subscribe(data => {
        this.speciesList = data.results;
        // Inicializa a lista filtrada com a lista completa no início
        this.filteredSpeciesList = this.speciesList;
      });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredSpeciesList = this.speciesList; // Garante que a lista completa seja exibida ao limpar a pesquisa
  }

  onSearch(): void {
    // Atualiza a lista filtrada com base na string de pesquisa
    this.filteredSpeciesList = this.speciesList.filter(specie =>
      specie.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Função chamada ao limpar o input
  onClear(): void {
    // Volta a exibir a lista completa
    this.filteredSpeciesList = this.speciesList;
    // Limpa a string de pesquisa
    this.searchTerm = '';
  }
}