import { ISection } from 'app/shared/model/section.model';

export interface IAssignment {
    id?: number;
    taID?: number;
    sectNo?: number;
    section?: ISection;
}

export class Assignment implements IAssignment {
    constructor(public id?: number, public taID?: number, public sectNo?: number, public section?: ISection) {}
}
