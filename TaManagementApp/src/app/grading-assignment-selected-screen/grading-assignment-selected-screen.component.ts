import { Component, OnInit , AfterViewInit } from '@angular/core';
import { TAInfo } from './../Model/TAInfo';

@Component({
  selector: 'app-grading-assignment-selected-screen',
  templateUrl: './grading-assignment-selected-screen.component.html',
  styleUrls: ['./grading-assignment-selected-screen.component.css']
})
export class GradingAssignmentSelectedScreenComponent implements OnInit, AfterViewInit  {
  selectedOption: String = '';
  selectedOption2: String = '';
  modal: any;
  btn: any;
  span: any;
  acceptedTAList: TAInfo[]; // Candidate TA's for Course
  currentTAList: TAInfo[]; // Current TA's for selected course

  constructor() {
    this.modal = null;
    this.btn = null;
    this.span = null;
    this.acceptedTAList = [];
    this.currentTAList = [];
  }

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
  public addTASelected(event): void {
    this.modal.style.display = 'block';
    console.log('clicked');
  }
  public closePopup(): void {
    this.modal.style.display = 'none';

  }


  ngOnInit() {
    this.setAcceptedTAList();
  }
  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.modal = document.getElementById('myModal');
    this.btn = document.getElementById('myBtn');
    this.span = document.getElementsByClassName('close')[0];

  }

  public setAcceptedTAList() {
    // This method will need to query backend to get list of students who are accepted TA's who
    // have also taken the currently selected course.
    // For now mock data is used
    const TA1: TAInfo = { firstName: 'Matt', lastName: 'Pointer', selectedCourseGrade: 'A', selectedCourseTerm: 'Spring 2017' };
    const TA2: TAInfo = { firstName: 'Matt', lastName: 'Tran', selectedCourseGrade: 'B', selectedCourseTerm: 'Spring 2017' };
    const TA3: TAInfo = { firstName: 'Abby', lastName: 'Bryam', selectedCourseGrade: 'A', selectedCourseTerm: 'Spring 2017' };
    const TA4: TAInfo = { firstName: 'Neil', lastName: 'Watson', selectedCourseGrade: 'C', selectedCourseTerm: 'Spring 2017' };
    const TA5: TAInfo = { firstName: 'Bob', lastName: 'TA', selectedCourseGrade: 'A', selectedCourseTerm: 'Spring 2017' };

    this.acceptedTAList.push(TA1);
    this.acceptedTAList.push(TA2);
    this.acceptedTAList.push(TA3);
    this.acceptedTAList.push(TA4);
    this.acceptedTAList.push(TA5);
  }

}
