import { ICourse } from 'app/shared/model/course.model';
import { IAssignment } from 'app/shared/model/assignment.model';

export interface ISection {
    id?: number;
    crn?: number;
    sectNo?: number;
    semester?: string;
    lectureTime?: string;
    labTime?: string;
    lectureRoom?: string;
    labRoom?: string;
    capacity?: number;
    course?: ICourse;
    assignments?: IAssignment[];
}

export class Section implements ISection {
    constructor(
        public id?: number,
        public crn?: number,
        public sectNo?: number,
        public semester?: string,
        public lectureTime?: string,
        public labTime?: string,
        public lectureRoom?: string,
        public labRoom?: string,
        public capacity?: number,
        public course?: ICourse,
        public assignments?: IAssignment[]
    ) {}
}
