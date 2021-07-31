import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../model/country';
import { State } from '../model/state';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  private basecountryurl = 'http://localhost:8181/api/countries';
  private basestateurl = 'http://localhost:8181/api/states';


  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.basecountryurl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(countrycode: string): Observable<State[]> {

    // search url
    const searchStatesUrl = `${this.basestateurl}/search/findByCountryCode?code=${countrycode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }
 

}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}