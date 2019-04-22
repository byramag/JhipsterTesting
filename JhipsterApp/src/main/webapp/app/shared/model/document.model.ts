import { ISection } from 'app/shared/model/section.model';
import { IAssignment } from 'app/shared/model/assignment.model';

export interface IDocument {
    id?: number;
    documentContentType?: string;
    document?: any;
    section?: ISection;
    assignment?: IAssignment;
}

export class Document implements IDocument {
    constructor(
        public id?: number,
        public documentContentType?: string,
        public document?: any,
        public section?: ISection,
        public assignment?: IAssignment
    ) {}
}
