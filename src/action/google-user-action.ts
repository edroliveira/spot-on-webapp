import { GoogleUserData } from "../models/google-user-data";

export class SetGoogleUser {
    static readonly type = '[Google User] SetGoogleUser';

    constructor(public googleUser: GoogleUserData) { }
}