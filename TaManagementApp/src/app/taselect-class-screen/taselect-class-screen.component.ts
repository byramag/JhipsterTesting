import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TAInfo } from './../Model/TAInfo';

@Component({
  selector: 'app-taselect-class-screen',
  templateUrl: './taselect-class-screen.component.html',
  styleUrls: ['./taselect-class-screen.component.css']
})
export class TASelectClassScreenComponent implements OnInit, AfterViewInit {

  acceptedTAList: TAInfo[]; // Candidate TA's for Course
  currentTAList: TAInfo[]; // Current TA's for selected course
  modal: any;
  btn: any;
  span: any;

  constructor() {
    this.acceptedTAList = [];
    this.currentTAList = [];
    this.modal = null;
    this.btn = null;
    this.span = null;
  }

  ngOnInit() {
    this.setAcceptedTAList();
    this.setCurrentTAList();
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.modal = document.getElementById('myModal');
    this.btn = document.getElementById('myBtn');
    this.span = document.getElementsByClassName('close')[0];

  }

  public closePopup() {
    this.modal.style.display = 'none';

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

  public setCurrentTAList() {
    const TA1: TAInfo = { firstName: 'Bob', lastName: 'Pointer', selectedCourseGrade: 'A', selectedCourseTerm: 'Spring 2017' };
    const TA2: TAInfo = { firstName: 'Nathan', lastName: 'Tran', selectedCourseGrade: 'B', selectedCourseTerm: 'Spring 2017' };
    const TA3: TAInfo = { firstName: 'Yoni', lastName: 'Bryam', selectedCourseGrade: 'A', selectedCourseTerm: 'Spring 2016' };
    this.currentTAList.push(TA1);
    this.currentTAList.push(TA2);
    this.currentTAList.push(TA3);
  }

  public plusSelect() {
    this.modal.style.display = 'block';
  }


}
