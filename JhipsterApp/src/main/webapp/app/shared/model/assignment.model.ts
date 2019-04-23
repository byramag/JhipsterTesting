import { IGrading } from 'app/shared/model/grading.model';
import { IDocument } from 'app/shared/model/document.model';

export const enum GradingStyle {
    BY_STUDENT = 'BY_STUDENT',
    BY_RUBRIC_ITEM = 'BY_RUBRIC_ITEM'
}

export const enum AssignmentType {
    HOMEWORK = 'HOMEWORK',
    TEST = 'TEST',
    PROJECT = 'PROJECT'
}

export interface IAssignment {
    id?: number;
    description?: string;
    totalPoints?: number;
    numParts?: number;
    numSubmissions?: number;
    gradeBy?: GradingStyle;
    gradingDirections?: string;
    type?: AssignmentType;
    gradingLink?: string;
    gradings?: IGrading[];
    docs?: IDocument[];
}

export class Assignment implements IAssignment {
    constructor(
        public id?: number,
        public description?: string,
        public totalPoints?: number,
        public numParts?: number,
        public numSubmissions?: number,
        public gradeBy?: GradingStyle,
        public gradingDirections?: string,
        public type?: AssignmentType,
        public gradingLink?: string,
        public gradings?: IGrading[],
        public docs?: IDocument[]
    ) {}
}
