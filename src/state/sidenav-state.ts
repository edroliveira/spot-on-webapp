import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { SetToggleSidenav } from "../action/sidenav-action";

@State<boolean>({
    name: 'ToggleSidenavState',
    defaults: false
})
@Injectable()
export class SidenavState {
    @Selector()
    static getToggleSidenav(state: boolean): boolean {
        return state;
    }

    @Action(SetToggleSidenav)
    setGoogleUser(ctx: StateContext<boolean>, action: SetToggleSidenav) {
        ctx.setState(action.toggleSidenav);
    }
}