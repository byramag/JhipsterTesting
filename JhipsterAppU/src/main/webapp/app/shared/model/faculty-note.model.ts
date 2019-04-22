import { Moment } from 'moment';
import { ITa } from 'app/shared/model/ta.model';
import { ISection } from 'app/shared/model/section.model';
import { IFaculty } from 'app/shared/model/faculty.model';

export interface IFacultyNote {
    id?: number;
    createdOn?: Moment;
    noteText?: string;
    ta?: ITa;
    section?: ISection;
    writtenBy?: IFaculty;
}

export class FacultyNote implements IFacultyNote {
    constructor(
        public id?: number,
        public createdOn?: Moment,
        public noteText?: string,
        public ta?: ITa,
        public section?: ISection,
        public writtenBy?: IFaculty
    ) {}
}
