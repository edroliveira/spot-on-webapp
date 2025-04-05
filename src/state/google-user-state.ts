import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GoogleUserData } from "../models/google-user-data";
import { Injectable } from "@angular/core";
import { SetGoogleUser } from "../action/google-user-action";

export interface GoogleUserStateModel {
    currentUser: GoogleUserData | null;
}

@State<GoogleUserStateModel>({
    name: 'GoogleUserState',
    defaults: {
        currentUser: null
    }
})
@Injectable()
export class GoogleUserState {
    @Selector()
    static getCurrentUser(state: GoogleUserStateModel): GoogleUserData | null {
        return state.currentUser;
    }

    @Action(SetGoogleUser)
    setGoogleUser(ctx: StateContext<GoogleUserStateModel>, action: SetGoogleUser) {
        console.log('Google User Data set in state:', action.googleUser);

        const state = ctx.getState();
        ctx.setState({
            ...state,
            currentUser: action.googleUser
        });
        console.log(ctx.getState());
    }
}