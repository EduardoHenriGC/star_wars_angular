import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuData } from 'src/app/interfaces/menuData';


@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {
  peopleList: MenuData[] = [];
  filteredPeopleList: MenuData[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  showPersonDetails(person: MenuData): void {
    // Pegando o id pela url
    const personId = person.url.split('/').filter(Boolean).pop();
    this.router.navigate(['/pessoa', personId]);
  }

  ngOnInit(): void {
    this.http.get<{ results: MenuData[] }>('https://swapi.dev/api/people')
      .subscribe(data => {
        this.peopleList = data.results;
        // Inicializa a lista filtrada com a lista completa no início
        this.filteredPeopleList = this.peopleList;
      });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredPeopleList = this.peopleList; // Garante que a lista completa seja exibida ao limpar a pesquisa
  }

  onSearch(): void {
    // Atualiza a lista filtrada com base na string de pesquisa
    this.filteredPeopleList = this.peopleList.filter(people =>
      people.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Função chamada ao limpar o input
  onClear(): void {
    // Volta a exibir a lista completa
    this.filteredPeopleList = this.peopleList;
    // Limpa a string de pesquisa
    this.searchTerm = '';
  }
}
