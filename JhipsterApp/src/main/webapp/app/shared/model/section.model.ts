import { IDocument } from 'app/shared/model/document.model';
import { ITimeWindow } from 'app/shared/model/time-window.model';
import { ITANote } from 'app/shared/model/ta-note.model';
import { IFacultyNote } from 'app/shared/model/faculty-note.model';
import { ICourse } from 'app/shared/model/course.model';
import { IFaculty } from 'app/shared/model/faculty.model';
import { ITa } from 'app/shared/model/ta.model';

export interface ISection {
    id?: number;
    sectionId?: number;
    semester?: string;
    year?: number;
    labRoom?: string;
    lectureRoom?: string;
    capacity?: number;
    enrolled?: number;
    docs?: IDocument[];
    lectureTimes?: ITimeWindow[];
    labTimes?: ITimeWindow[];
    taNotes?: ITANote[];
    facutlyNotes?: IFacultyNote[];
    course?: ICourse;
    faculty?: IFaculty;
    tas?: ITa[];
}

export class Section implements ISection {
    constructor(
        public id?: number,
        public sectionId?: number,
        public semester?: string,
        public year?: number,
        public labRoom?: string,
        public lectureRoom?: string,
        public capacity?: number,
        public enrolled?: number,
        public docs?: IDocument[],
        public lectureTimes?: ITimeWindow[],
        public labTimes?: ITimeWindow[],
        public taNotes?: ITANote[],
        public facutlyNotes?: IFacultyNote[],
        public course?: ICourse,
        public faculty?: IFaculty,
        public tas?: ITa[]
    ) {}
}
