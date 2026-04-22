import { User } from "../models/user";

export class SetUser {
    static readonly type = '[User] SetUser';

    constructor(public user: User) { }
}