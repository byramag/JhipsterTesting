import { Component, OnInit, AfterViewInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { Assignment } from './../Model/Assignment';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-grading-class-screen',
    templateUrl: './grading-class-screen.component.html',
    styleUrls: ['./grading-class-screen.component.css']
})
// tslint:disable-next-line:component-class-suffix
// export class AssignmentClass {
//     assignmentName: string;
//     assignmentPoints: any;
//     assignmentDesc: string;
// }
export class GradingClassScreenComponent implements OnInit, AfterViewInit {
    assignmentList: Assignment[];
    selectedAssignmentHTMLToggle: boolean;
    selectedAssignmentName: string;
    modal: any;
    btn: any;
    span: any;
    // public val: AssignmentClass;

    constructor() {
        this.selectedAssignmentHTMLToggle = true;
        this.assignmentList = [];
        this.modal = null;
        this.btn = null;
        this.span = null;
    }

    ngOnInit() {
        this.setAssignmentList();
        // val: new AssignmentClass();
    }
    ngAfterViewInit(): void {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        this.modal = document.getElementById('myModal');
        this.btn = document.getElementById('myBtn');
        this.span = document.getElementsByClassName('close')[0];
    }

    public setAssignmentList() {
        // Note: Here we need to access backend to get the list of assignments associated with the class the user clicked on.
        // For now I've made mock data of Assignment objects.

        for (let i = 0; i < 3; i++) {
            const temp: Assignment = {
                assignmentName: 'Mock Assignment ' + i,
                points: 100 + 10 * i,
                desc: 'mock'
            };
            this.assignmentList.push(temp);
        }
    }

    public selectAssignment(assignName: string) {
        this.selectedAssignmentHTMLToggle = false; // user selected an assignment, change ui
        this.selectedAssignmentName = assignName;
    }
    public addAssignmentModal(event): void {
        this.modal.style.display = 'block';
        console.log('clicked');
    }
    public closePopup(): void {
        this.modal.style.display = 'none';
    }
    public addAssignment(assignmentName1: string): void {
        const temp: Assignment = {
            assignmentName: assignmentName1,
            points: 100 + 10,
            desc: 'hi'
        };
        // console.log(assignmentName1);
        this.assignmentList.push(temp);
    }
}
