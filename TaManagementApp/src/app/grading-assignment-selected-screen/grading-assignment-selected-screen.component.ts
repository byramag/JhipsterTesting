import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grading-assignment-selected-screen',
  templateUrl: './grading-assignment-selected-screen.component.html',
  styleUrls: ['./grading-assignment-selected-screen.component.css']
})
export class GradingAssignmentSelectedScreenComponent implements OnInit {
  selectedOption: String = '';
  selectedOption2: String = '';

  public onChange(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    if (newVal === 'option1') {
      this.selectedOption = 'option1';
    }
    if (newVal === 'option2') {
      this.selectedOption = 'option2';
    }
    // console.log(newVal);
  }


  constructor() { }

  ngOnInit() {
  }

}
