import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class EspecieResolver implements Resolve<any> {
    constructor(private apiService: ApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const specieId = route.paramMap.get('id');

        if (specieId !== null) {

            return this.apiService.getEspeciesDetailsById(specieId);
        } else {

            throw new Error("ID da pessoa não encontrado na URL");
        }
    }
}
