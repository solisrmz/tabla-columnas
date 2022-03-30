import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataSource = ELEMENT_DATA;

  displayedColumns = ['id', 'name', 'descriptions'];

  spans = [];

  constructor() {
    this.cacheSpan('Priority', (d) => d.id);
    this.cacheSpan('Name', (d) => d.name);
    console.log(this.spans);
  }

  /**
   * Evaluated and store an evaluation of the rowspan for each row.
   * The key determines the column it affects, and the accessor determines the
   * value that should be checked for spanning.
   */
  cacheSpan(key, accessor) {
    for (let i = 0; i < DATA.length; ) {
      let currentValue = accessor(DATA[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < DATA.length; j++) {
        if (currentValue != accessor(DATA[j])) {
          break;
        }

        count++;
      }

      if (!this.spans[i]) {
        this.spans[i] = {};
      }

      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }

  getRowSpan(col, index) {
    return this.spans[index] && this.spans[index][col];
  }
}

export interface PeriodicElement {
  id: number;
  name: string[];
  descriptions: string[];
}

const originalData = [
  {
    id: 1,
    name: ['1', '2'],
    descriptions: ['row1', 'row2'],
  },
  {
    id: 2,
    name: ['3', '4'],
    descriptions: ['row1', 'row2', 'row3'],
  },
];

const DATA = originalData.reduce((current, next) => {
  next.name.forEach(t=>{
    
    next.descriptions.forEach(d=>{
      current.push({
        id: next.id,
        name: t,
        descriptions: d,
     
    });

    })
     
  })
  

  

  return current;
}, []);
console.log(DATA);

const ELEMENT_DATA: PeriodicElement[] = DATA;
