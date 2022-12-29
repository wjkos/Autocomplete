import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  citiesUrl = 'http://localhost:5226/api/cities';
  results;
  dataReceived = new Subject<void>(); // indicates to anyone interested that server responded

  // -------------------------------------------------------------------
  constructor(private http: HttpClient) {}
  // -------------------------------------------------------------------
  // with error handling
  // -------------------------------------------------------------------
  getCitiesData() {
    this.http.get(this.citiesUrl).subscribe({
        next: (data) => {
          this.results = data;
          this.dataReceived.next(); // announce that server responded
        },
        error: (message) => { console.log('Error: ', message);  },
        complete: () => { console.log('Complete'); }
      }
    );
  }
}
