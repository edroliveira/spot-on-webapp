import { TimeLocationRecord } from "../models/register-time-location";

export class SetRecords {
    static readonly type = '[TimeLocationRecord] SetRecords';

    constructor(public records: TimeLocationRecord[]) { }
}