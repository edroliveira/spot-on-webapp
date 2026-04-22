import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { SetUser } from "../action/user-action";

export interface UserStateModel {
    currentUser: User | null;
}

@State<UserStateModel>({
    name: 'UserState',
    defaults: {
        currentUser: null
    }
})
@Injectable()
export class UserState {
    @Selector()
    static getCurrentUser(state: UserStateModel): User | null {
        return state.currentUser;
    }

    @Action(SetUser)
    setUser(ctx: StateContext<UserStateModel>, action: SetUser) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            currentUser: action.user
        });
    }
}