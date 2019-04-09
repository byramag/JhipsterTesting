import { IUser } from 'app/core/user/user.model';
import { ISection } from 'app/shared/model/section.model';

export interface IFaculty {
    id?: number;
    name?: string;
    email?: string;
    isAdmin?: boolean;
    user?: IUser;
    sections?: ISection[];
}

export class Faculty implements IFaculty {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public isAdmin?: boolean,
        public user?: IUser,
        public sections?: ISection[]
    ) {
        this.isAdmin = this.isAdmin || false;
    }
}
