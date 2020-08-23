import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
})
export class ValueComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  values: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.subscription = this.http
      .get('http://localhost:5000/api/values')
      .subscribe(
        (response) => {
          this.values = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
