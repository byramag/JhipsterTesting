import { ITa } from 'app/shared/model/ta.model';
import { IAssignment } from 'app/shared/model/assignment.model';

export interface IGrading {
    id?: number;
    status?: string;
    numAssigned?: number;
    numCompleted?: number;
    taAssigned?: ITa;
    forAssignment?: IAssignment;
}

export class Grading implements IGrading {
    constructor(
        public id?: number,
        public numAssigned?: number,
        public numCompleted?: number,
        public taAssigned?: ITa,
        public forAssignment?: IAssignment,
        public status?: string
        ) {
            this.status = 'Assigned';
        }
}
