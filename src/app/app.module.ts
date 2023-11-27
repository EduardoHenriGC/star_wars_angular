import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonGridComponent } from './components/button-grid/button-grid.component';
import { PessoasComponent } from './components/pessoas/pessoas.component';
import { PessoaDetalhesComponent } from './components/pessoa-detalhes/pessoa-detalhes.component';
import { FormsModule } from '@angular/forms';
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
import { BgListComponent } from './components/bg-list/bg-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ButtonGridComponent,
    PessoasComponent,
    PessoaDetalhesComponent,
    BackgroundComponent,
    PlanetasComponent,
    PlanetaDetalhesComponent,
    FilmesComponent,
    FilmeDetalhesComponent,
    EspeciesComponent,
    EspecieDetalhesComponent,
    VeiculosComponent,
    VeiculoDetalhesComponent,
    EspaconavesComponent,
    EspaconaveDetalhesComponent,
    BgListComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
