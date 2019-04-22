import { Moment } from 'moment';
import { ISection } from 'app/shared/model/section.model';
import { ITa } from 'app/shared/model/ta.model';

export interface ITANote {
    id?: number;
    createdOn?: Moment;
    noteText?: string;
    section?: ISection;
    writtenBy?: ITa;
}

export class TANote implements ITANote {
    constructor(
        public id?: number,
        public createdOn?: Moment,
        public noteText?: string,
        public section?: ISection,
        public writtenBy?: ITa
    ) {}
}
