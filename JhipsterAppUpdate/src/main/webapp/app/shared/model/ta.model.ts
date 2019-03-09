import { IUser } from 'app/core/user/user.model';
import { IGrading } from 'app/shared/model/grading.model';
import { ITimeWindow } from 'app/shared/model/time-window.model';
import { IFacultyNote } from 'app/shared/model/faculty-note.model';
import { ISection } from 'app/shared/model/section.model';
import { ICourse } from 'app/shared/model/course.model';
import { ITaRole } from 'app/shared/model/ta-role.model';

export interface ITa {
    id?: number;
    name?: string;
    email?: string;
    vNum?: string;
    classYear?: string;
    expectedGradYear?: number;
    expectedGradSemester?: string;
    totalHoursAvailable?: number;
    isActive?: boolean;
    user?: IUser;
    gradings?: IGrading[];
    availabilities?: ITimeWindow[];
    notes?: IFacultyNote[];
    sections?: ISection[];
    courseQualifieds?: ICourse[];
    courseHasExperiences?: ICourse[];
    availableRoles?: ITaRole[];
}

export class Ta implements ITa {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public vNum?: string,
        public classYear?: string,
        public expectedGradYear?: number,
        public expectedGradSemester?: string,
        public totalHoursAvailable?: number,
        public isActive?: boolean,
        public user?: IUser,
        public gradings?: IGrading[],
        public availabilities?: ITimeWindow[],
        public notes?: IFacultyNote[],
        public sections?: ISection[],
        public courseQualifieds?: ICourse[],
        public courseHasExperiences?: ICourse[],
        public availableRoles?: ITaRole[]
    ) {
        this.isActive = this.isActive || false;
    }
}
