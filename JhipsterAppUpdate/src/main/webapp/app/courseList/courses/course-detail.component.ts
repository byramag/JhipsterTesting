import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISection } from 'app/shared/model/section.model';

@Component({
    selector: 'jhi-course-detail',
    templateUrl: './course-detail.component.html'
})
export class CourseDetailComponent implements OnInit {
    section: ISection;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ section }) => {
            this.section = section;
        });
    }

    previousState() {
        window.history.back();
    }
}
