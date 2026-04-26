import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { TimeLocationRecord } from "../models/register-time-location";
import { SetRecords } from "../action/record.action";

export interface RecordsStateModel {
    currentRecords: TimeLocationRecord[] | null;
}

@State<RecordsStateModel>({
    name: 'RecordsState',
    defaults: {
        currentRecords: null
    }
})
@Injectable()
export class RecordsState {
    @Selector()
    static getCurrentRecords(state: RecordsStateModel): TimeLocationRecord[] | null {
        return state.currentRecords;
    }

    @Action(SetRecords)
    setRecords(ctx: StateContext<RecordsStateModel>, action: SetRecords) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            currentRecords: action.records
        });
    }
}