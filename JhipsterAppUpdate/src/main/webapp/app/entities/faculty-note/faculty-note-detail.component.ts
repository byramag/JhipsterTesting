import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFacultyNote } from 'app/shared/model/faculty-note.model';

@Component({
    selector: 'jhi-faculty-note-detail',
    templateUrl: './faculty-note-detail.component.html'
})
export class FacultyNoteDetailComponent implements OnInit {
    facultyNote: IFacultyNote;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ facultyNote }) => {
            this.facultyNote = facultyNote;
        });
    }

    previousState() {
        window.history.back();
    }
}
