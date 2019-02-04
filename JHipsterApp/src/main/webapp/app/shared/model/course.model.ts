import { ISection } from 'app/shared/model/section.model';

export interface ICourse {
    id?: number;
    courseName?: string;
    courseID?: string;
    courseDesc?: string;
    sections?: ISection[];
}

export class Course implements ICourse {
    constructor(
        public id?: number,
        public courseName?: string,
        public courseID?: string,
        public courseDesc?: string,
        public sections?: ISection[]
    ) {}
}
