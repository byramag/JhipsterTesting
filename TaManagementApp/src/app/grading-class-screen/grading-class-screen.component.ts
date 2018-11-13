import { Component, OnInit } from '@angular/core';
import { Assignment } from './../Model/Assignment';


@Component({
  selector: 'app-grading-class-screen',
  templateUrl: './grading-class-screen.component.html',
  styleUrls: ['./grading-class-screen.component.css']
})
export class GradingClassScreenComponent implements OnInit {

  assignmentList: Assignment[];
  selectedAssignmentHTMLToggle: boolean;
  selectedAssignmentName: string;

  constructor() {
    this.selectedAssignmentHTMLToggle = true;
    this.assignmentList = [];
  }

  ngOnInit() {
    this.setAssignmentList();
  }

  public setAssignmentList() {
    // Note: Here we need to access backend to get the list of assignments associated with the class the user clicked on.
    // For now I've made mock data of Assignment objects.

    for (let i = 0; i < 3; i++) {
      const temp: Assignment = {
        assignmentName: 'Mock Assignment ' + i,
        points: 100 + (10 * i)
      };
      this.assignmentList.push(temp);
    }
  }

  public selectAssignment(assignName: string) {
    this.selectedAssignmentHTMLToggle = false; // user selected an assignment, change ui
    this.selectedAssignmentName = assignName;
  }

}
