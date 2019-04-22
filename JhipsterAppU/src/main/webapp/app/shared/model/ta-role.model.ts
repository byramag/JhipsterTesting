import { ITa } from 'app/shared/model/ta.model';

export const enum Role {
    TUTOR = 'TUTOR',
    LAB_TA = 'LAB_TA',
    CLASSROOM = 'CLASSROOM',
    TEST_GRADE = 'TEST_GRADE',
    HW_GRADE = 'HW_GRADE',
    PROJECT_GRADE = 'PROJECT_GRADE',
    OFFICE_HOUR = 'OFFICE_HOUR',
    HELP_SESSION = 'HELP_SESSION',
    SLACK = 'SLACK'
}

export interface ITaRole {
    id?: number;
    role?: Role;
    tas?: ITa[];
}

export class TaRole implements ITaRole {
    constructor(public id?: number, public role?: Role, public tas?: ITa[]) {}
}
