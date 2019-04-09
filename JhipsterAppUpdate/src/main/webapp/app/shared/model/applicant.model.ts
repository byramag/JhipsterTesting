export interface IApplicant {
    id?: number;
    name?: string;
    email?: string;
    vNum?: string;
    classYear?: string;
    expectedGradYear?: number;
    expectedGradSemester?: string;
    statement?: string;
    grade255?: string;
    grade256?: string;
    grade257?: string;
    referenceEmail?: string;
    referenceResponse?: string;
    isRecommended?: boolean;
}

export class Applicant implements IApplicant {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public vNum?: string,
        public classYear?: string,
        public expectedGradYear?: number,
        public expectedGradSemester?: string,
        public statement?: string,
        public grade255?: string,
        public grade256?: string,
        public grade257?: string,
        public referenceEmail?: string,
        public referenceResponse?: string,
        public isRecommended?: boolean
    ) {
        this.isRecommended = this.isRecommended || false;
    }
}
