import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-main-host',
  templateUrl: './main-host.component.html',
  styleUrls: ['./main-host.component.css']
})
export class MainHostComponent implements OnInit {

  citiesData;
  suggestedValues = [];
  chosenValue = '';
  showAutoComplete = false;

  constructor(private httpClient:HttpService) { }
  // -------------------------------------------------------------------
  ngOnInit(): void {
    this.httpClient.dataReceived.subscribe( // subscribes for the event of server response
      () => {
        this.citiesData = this.httpClient.results;
      }
    );
    this.httpClient.getCitiesData(); // triggers data retrieval from the server
  }
  // -------------------------------------------------------------------
  // Bug - lower case and upper case cities are not merged in one list...
  // -------------------------------------------------------------------
  inputFieldChanged(event) {

    let value = event.target.value;
    this.chosenValue = value;
    if(value === undefined || value === '') return;
    let first_letter = value[0];
    this.showAutoComplete=true;

    if(this.citiesData[first_letter] === undefined) {
      first_letter = first_letter.toUpperCase();
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    if(this.citiesData[first_letter] === undefined) {
      return;
    }
    this.suggestedValues = this.citiesData[first_letter].filter(city => city.startsWith(value));
    this.suggestedValues = this.suggestedValues.slice(0,50); // show only first 50 values
  }
  // -------------------------------------------------------------------
  valueChosen(value){
    this.chosenValue=value; 
    this.showAutoComplete=false;
  }
}
