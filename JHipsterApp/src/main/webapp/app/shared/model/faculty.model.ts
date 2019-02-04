import { ISection } from 'app/shared/model/section.model';

export interface IFaculty {
    id?: number;
    profID?: string;
    profName?: string;
    email?: string;
    sections?: ISection[];
}

export class Faculty implements IFaculty {
    constructor(
        public id?: number,
        public profID?: string,
        public profName?: string,
        public email?: string,
        public sections?: ISection[]
    ) {}
}
