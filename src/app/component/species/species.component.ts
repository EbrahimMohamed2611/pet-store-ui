import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { throwError, of } from 'rxjs';
import { Species } from 'src/app/model/Species.model';
import { SpeciesService } from 'src/app/service/species/species.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {

  speciesId: number;
  allSpecies: Species[] = []; //without initialization this error will arise can't access property "push"
  currentSpecies: Species;
  currentIndex = -1;
  species: Species = new Species();
  speciesForm: FormGroup;
  submitted: boolean = false;
  invalidId: boolean;

  errorMsg: string;

  constructor(private formBuilder: FormBuilder, private speciesService: SpeciesService) {
  }



  ngOnInit(): void {
  }

  /**
   * Get Species By Id
   */
  public getSpeciesById() {
    this.speciesService.getSpeciesById(this.species.speciesId).subscribe(
      (response) => {
        if (response.code) {
          //console.log(response.message);
          this.invalidId = true;
        } else {
          this.allSpecies = []
          this.allSpecies[0] = (<Species>response);
        }
        //console.log('response => ', response);
      }
    );
  }

  public getAllSpecies(): void {
    this.speciesService.getAllSpecies().subscribe(
      (response) => {
        //console.log('response => ', response);
        this.allSpecies = response;
      },
      (error: HttpErrorResponse) => {
        //console.log('error => ', error);
      }
    );
  }

  addNewSpecies(): void {
    //console.log('Species to be added => ', this.species);
    this.speciesService.addNewSpecies(this.species)
      .subscribe(
        (response) => {
          //console.log('response => ', response);
          this.submitted = true;
        },
        (error: HttpErrorResponse) => {
          //console.log('error => ', error);
        });
  }

  /**
   * Delete species by id
   */
  public deleteSpeciesById() {
    this.speciesService.deleteSpeciesById(this.speciesId).subscribe(
      (response) => {
        //console.log("Species with id ", this.speciesId);
      },
      (error: HttpErrorResponse) => {
        //console.log('error => ', error);
      }
    );
  }

  /**
   * name
   */
  public updateSpecies(){
    this.speciesService.updateSpecies(this.species).subscribe(
      (response) => {
        //console.log("Updated Species:  ",response );
      },
      (error: HttpErrorResponse) => {
        //console.log('error => ', error);
      }
    );

  }

  newSpecies(): void {
    this.submitted = false;
    this.species = {
      speciesName: '',
      speciesId: 0
    };
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


}
