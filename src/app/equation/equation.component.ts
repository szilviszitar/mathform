import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter, scan } from 'rxjs';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent {
  secondPerSolution = 0;
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  },
    [MathValidators.addition('answer', 'a', 'b'),
    ]
  );
b: any;
answer: any;




  //getter metódus, a  html templaten {{a}}-hivja

  get a() {
    return this.mathForm.value.a
  }

  ngOnInit() {
    this.mathForm.statusChanges.pipe(
      filter(value => value === 'VALID'),
      delay(500),
      scan((acc) => {
        return {
          numberSolved: acc.numberSolved + 1,
          startTime: acc.startTime
        }

      }, { numberSolved: 0, startTime: new Date() })
    ).subscribe(({ numberSolved, startTime }) => {

      this.secondPerSolution = (
        new Date().getTime() - startTime.getTime()) / numberSolved / 1000;


      this.mathForm.setValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: ''
      });
    });

  }


  randomNumber() {
    return Math.floor(Math.random() * 10)
  }
}
