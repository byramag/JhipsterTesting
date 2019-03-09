import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITANote } from 'app/shared/model/ta-note.model';

@Component({
    selector: 'jhi-ta-note-detail',
    templateUrl: './ta-note-detail.component.html'
})
export class TANoteDetailComponent implements OnInit {
    tANote: ITANote;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tANote }) => {
            this.tANote = tANote;
        });
    }

    previousState() {
        window.history.back();
    }
}
