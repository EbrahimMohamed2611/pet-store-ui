import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Species } from 'src/app/model/Species.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  private url = environment.apiUrl + "species";

  constructor(private httpClient: HttpClient) { }

  addNewSpecies(species: Species): Observable<Species> {
    return this.httpClient.post<Species>(this.url, species);
  }
  
  getAllSpecies(): Observable<Species[]> {
    return this.httpClient.get<Species[]>(this.url);
  }

  getSpeciesById(id: number): Observable<any> {
    return this.httpClient.get<Species>(this.url + "/" + id);
  }

  updateSpecies(species: Species): Observable<Species> {
    return this.httpClient.put<Species>(this.url + "/" + species.speciesId, species);
  }

  deleteSpeciesById(id: number): Observable<any> {
    return this.httpClient.delete(this.url + "/" + id);
  }
}
