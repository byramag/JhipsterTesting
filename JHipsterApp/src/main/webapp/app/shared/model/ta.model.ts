import { ISection } from 'app/shared/model/section.model';
import { IAssignment } from 'app/shared/model/assignment.model';

export interface ITA {
    id?: number;
    studentName?: string;
    vNumber?: string;
    email?: string;
    classYear?: string;
    currentAssign?: string;
    previousAssign?: string;
    ptdLabTA?: string;
    ptdClassTA?: string;
    ptdTestGrade?: string;
    ptdOfficeHours?: string;
    acceptedCourses?: string;
    sections?: ISection[];
    assignments?: IAssignment[];
}

export class TA implements ITA {
    constructor(
        public id?: number,
        public studentName?: string,
        public vNumber?: string,
        public email?: string,
        public classYear?: string,
        public currentAssign?: string,
        public previousAssign?: string,
        public ptdLabTA?: string,
        public ptdClassTA?: string,
        public ptdTestGrade?: string,
        public ptdOfficeHours?: string,
        public acceptedCourses?: string,
        public sections?: ISection[],
        public assignments?: IAssignment[]
    ) {}
}
