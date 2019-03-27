import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-handbook',
    templateUrl: './handbook.component.html'
})
export class HandbookComponent implements OnInit {
    ngOnInit() {}

    previousState() {
        window.history.back();
    }
}
