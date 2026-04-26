import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient } from '@angular/common/http';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { withNgxsWebSocketPlugin } from '@ngxs/websocket-plugin';
import { provideStore } from '@ngxs/store';
import { UserState } from '../state/user-state';
import { GoogleUserState } from '../state/google-user-state';
import { SidenavState } from '../state/sidenav-state';
import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { RecordsState } from '../state/record.state';

registerLocaleData(localePT)

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideOAuthClient(),
    provideStore(
      [UserState, GoogleUserState, SidenavState, RecordsState],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsFormPlugin(),
      withNgxsRouterPlugin(),
      withNgxsWebSocketPlugin()),
  ]
};
