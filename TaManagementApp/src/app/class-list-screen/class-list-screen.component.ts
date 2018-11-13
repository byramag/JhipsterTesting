import { Component, OnInit } from '@angular/core';
import { Class } from './../Model/Class';

@Component({
  selector: 'app-class-list-screen',
  templateUrl: './class-list-screen.component.html',
  styleUrls: ['./class-list-screen.component.css']
})
export class ClassListScreenComponent implements OnInit {

  professorsClassList: Class[];
  selectClassHTMLToggle: boolean;
  selectedClass: string[];
  constructor() {
    this.selectClassHTMLToggle = true;
    this.professorsClassList = [];
    this.selectedClass = [];
  }

  ngOnInit() {
    this.setProfClassList();
  }

  public setProfClassList() {
    // Need way to get teacher's list of Courses from backend to populate here in the front end.
    // For now, Create 3 mock class Objects (see Class.ts for the class interface) and populate them to the class list

    for (let i = 0; i < 3; i++) {
      const temp: Class = {
        className: 'Biology ' + i,
        classNumber: 100 + i
      };
      this.professorsClassList.push(temp);
    }
  }

  public selectClass(className: string) {
    this.selectClassHTMLToggle = false;
    this.selectedClass[0] = className;
  }

  // public buildClass(): Class {
  //  const
  // }

}
