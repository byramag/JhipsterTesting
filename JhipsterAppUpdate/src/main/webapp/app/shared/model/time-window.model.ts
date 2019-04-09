import { Moment } from 'moment';
import { ITa } from 'app/shared/model/ta.model';
import { ISection } from 'app/shared/model/section.model';

export interface ITimeWindow {
    id?: number;
    startTime?: Moment;
    endTime?: Moment;
    ta?: ITa;
    sectionLecture?: ISection;
    sectionLab?: ISection;
}

export class TimeWindow implements ITimeWindow {
    constructor(
        public id?: number,
        public startTime?: Moment,
        public endTime?: Moment,
        public ta?: ITa,
        public sectionLecture?: ISection,
        public sectionLab?: ISection
    ) {}
}
