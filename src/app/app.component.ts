import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  test_arr: any = [
    { name: 'anmol', class: 'es6', marks: 10 },
    { name: 'jay', class: 'es5', marks: 50 },
    { name: 'veeru', class: 'es6', marks: 15 },
  ];

  result: any = [];
  count: number = 10;

  output: string = '';
  n: number = 5;

  constructor() {}

  ngOnInit(): void {
    // this.pattern();
    // this.transformed(this.test_arr);
  }

  pattern() {
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n - i - 1; j++) {
        this.output += ' ';
      }
      for (let k = 0; k < i + 1; k++) {
        this.output += '* ';
      }
      this.output += '\n';
    }
    console.log(this.output);
  }

  transformed(arr: any) {
    arr.map((item: any) => {
      for (let i = 0; i <= arr.length; i++) {
        let x = this.result.push({
          key: item.class,
          value: item,
        });
        return x;
      }
    });
    console.log(this.result);
  }

  ngOnDestroy(): void {}
}
