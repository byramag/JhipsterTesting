import { ISection } from 'app/shared/model/section.model';
import { ITa } from 'app/shared/model/ta.model';

export interface ICourse {
    id?: number;
    courseName?: string;
    description?: string;
    department?: string;
    courseNumber?: number;
    sections?: ISection[];
    qualifiedTas?: ITa[];
    experiencedTas?: ITa[];
}

export class Course implements ICourse {
    constructor(
        public id?: number,
        public courseName?: string,
        public description?: string,
        public department?: string,
        public courseNumber?: number,
        public sections?: ISection[],
        public qualifiedTas?: ITa[],
        public experiencedTas?: ITa[]
    ) {}
}
