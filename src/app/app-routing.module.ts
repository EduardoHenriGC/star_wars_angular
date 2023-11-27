import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { PessoaDetalhesComponent } from './components/pessoa-detalhes/pessoa-detalhes.component';
import { BackgroundComponent } from './components/background/background.component';
import { PlanetasComponent } from './components/planetas/planetas.component';
import { PlanetaDetalhesComponent } from './components/planeta-detalhes/planeta-detalhes.component';
import { FilmesComponent } from './components/filmes/filmes.component';
import { FilmeDetalhesComponent } from './components/filme-detalhes/filme-detalhes.component';
import { EspeciesComponent } from './components/especies/especies.component';
import { EspecieDetalhesComponent } from './components/especie-detalhes/especie-detalhes.component';
import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { VeiculoDetalhesComponent } from './components/veiculo-detalhes/veiculo-detalhes.component';
import { EspaconavesComponent } from './components/espaconaves/espaconaves.component';
import { EspaconaveDetalhesComponent } from './components/espaconave-detalhes/espaconave-detalhes.component';
import { PersonResolver } from './components/pessoa-detalhes/pessoa.resolver';
import { PlanetResolver } from './components/planeta-detalhes/planeta.resolver';
import { FilmResolver } from './components/filme-detalhes/filme.resolver';
import { EspecieResolver } from './components/especie-detalhes/especie.resolver';
import { VeiculoResolver } from './components/veiculo-detalhes/veiculo.resolver';
import { EspaconaveResolver } from './components/espaconave-detalhes/espaconave.resolver';


const routes: Routes = [

  { path: "", component: BackgroundComponent },
  { path: "pessoas", component: PessoasComponent },
  {
    path: 'pessoa/:id', component: PessoaDetalhesComponent,
    resolve: {
      person: PersonResolver,
    },
  },
  { path: "planetas", component: PlanetasComponent },
  {
    path: 'planeta/:id', component: PlanetaDetalhesComponent,
    resolve: {
      planet: PlanetResolver,
    },
  },
  { path: "filmes", component: FilmesComponent },
  {
    path: 'filme/:id', component: FilmeDetalhesComponent,
    resolve: {
      film: FilmResolver,
    },
  },
  { path: "especies", component: EspeciesComponent },
  {
    path: 'especie/:id', component: EspecieDetalhesComponent,
    resolve: {
      specie: EspecieResolver,
    },
  },
  { path: "veiculos", component: VeiculosComponent },
  {
    path: 'veiculo/:id', component: VeiculoDetalhesComponent,
    resolve: {
      vehicle: VeiculoResolver,
    },
  },
  { path: "espaconaves", component: EspaconavesComponent },
  {
    path: 'espaconave/:id', component: EspaconaveDetalhesComponent,
    resolve: {
      starship: EspaconaveResolver,
    },
  },



];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PersonResolver]
})
export class AppRoutingModule { }
