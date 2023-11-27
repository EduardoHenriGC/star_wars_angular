import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuData } from 'src/app/interfaces/menuData';


@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.scss']
})
export class VeiculosComponent implements OnInit {
  vehicleList: MenuData[] = [];
  filteredVehicleList: MenuData[] = [];
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  showVehicleDetails(vehicle: MenuData): void {
    // Pegando o id pela url
    const vehicleId = vehicle.url.split('/').filter(Boolean).pop();
    this.router.navigate(['/veiculo', vehicleId]);
  }

  ngOnInit(): void {
    this.http.get<{ results: MenuData[] }>('https://swapi.dev/api/vehicles')
      .subscribe(data => {
        this.vehicleList = data.results;
        // Inicializa a lista filtrada com a lista completa no início
        this.filteredVehicleList = this.vehicleList;
      });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredVehicleList = this.vehicleList; // Garante que a lista completa seja exibida ao limpar a pesquisa
  }

  onSearch(): void {
    // Atualiza a lista filtrada com base na string de pesquisa
    this.filteredVehicleList = this.vehicleList.filter(vehicle =>
      vehicle.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Função chamada ao limpar o input
  onClear(): void {
    // Volta a exibir a lista completa
    this.filteredVehicleList = this.vehicleList;
    // Limpa a string de pesquisa
    this.searchTerm = '';
  }
}
