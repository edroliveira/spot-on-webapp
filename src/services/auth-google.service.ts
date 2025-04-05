import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../auth-config';
import { GoogleUserData } from '../models/google-user-data';
import { Store } from '@ngxs/store';
import { SetGoogleUser } from '../action/google-user-action';

@Injectable({
    providedIn: 'root',
})
export class AuthGoogleService {

    private oAuthService = inject(OAuthService);
    profile!: Record<string, any>;

    constructor(
        private store: Store
    ) {
        this.initConfiguration();
    }

    initConfiguration() {
        this.oAuthService.configure(authConfig);
        this.oAuthService.setupAutomaticSilentRefresh();
        this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
            console.log("hasValidToken", this.oAuthService.hasValidIdToken())
            if (this.oAuthService.hasValidIdToken()) {
                console.log('Identity claims', this.oAuthService.getIdentityClaims())
                this.profile = this.oAuthService.getIdentityClaims();
                console.log('Name', this.profile['name']);
                this.setGoogleUserData();
            }
        });
    }

    login() {
        this.oAuthService.initImplicitFlow();
    }

    logout() {
        this.oAuthService.revokeTokenAndLogout();
        this.oAuthService.logOut();
    }

    setGoogleUserData(): void {
        const googleUserData: GoogleUserData = {
            at_hash: this.profile['at_hash'],
            aud: this.profile['aud'],
            azp: this.profile['azp'],
            email: this.profile['email'],
            email_verified: this.profile['email_verified'],
            exp: this.profile['exp'],
            family_name: this.profile['family_name'],
            given_name: this.profile['given_name'],
            iat: this.profile['iat'],
            iss: this.profile['iss'],
            jti: this.profile['jti'],
            name: this.profile['name'],
            nbf: this.profile['nbf'],
            nonce: this.profile['nonce'],
            picture: this.profile['picture'],
            sub: this.profile['sub']
        };

        this.store.dispatch(new SetGoogleUser(googleUserData));
    }

}