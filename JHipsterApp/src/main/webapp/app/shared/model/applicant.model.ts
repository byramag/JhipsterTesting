import { ITA } from 'app/shared/model/ta.model';

export interface IApplicant {
    id?: number;
    studentName?: string;
    vNumber?: string;
    email?: string;
    taMotivation?: string;
    refName?: string;
    refEmail?: string;
    refResponse?: string;
    isConfirmed?: boolean;
    ta?: ITA;
}

export class Applicant implements IApplicant {
    constructor(
        public id?: number,
        public studentName?: string,
        public vNumber?: string,
        public email?: string,
        public taMotivation?: string,
        public refName?: string,
        public refEmail?: string,
        public refResponse?: string,
        public isConfirmed?: boolean,
        public ta?: ITA
    ) {
        this.isConfirmed = this.isConfirmed || false;
    }
}
