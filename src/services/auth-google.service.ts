import { Injectable, OnDestroy, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../auth-config';
import { GoogleUserData } from '../models/google-user-data';
import { Store } from '@ngxs/store';
import { SetGoogleUser } from '../action/google-user-action';
import { Router } from '@angular/router';
import { distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { GoogleUserState } from '../state/google-user-state';

@Injectable({
    providedIn: 'root',
})
export class AuthGoogleService implements OnDestroy {

    private oAuthService = inject(OAuthService);
    profile!: Record<string, any>;
    currentUser$: Observable<GoogleUserData | null> = this.store.select(GoogleUserState.getCurrentUser)
        .pipe(distinctUntilChanged());
    destroy$ = new Subject<void>();

    constructor(
        private readonly store: Store,
        private readonly router: Router
    ) {
        this.monitorUserState();
    }

    private monitorUserState(): void {
        this.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
                if (user === null || !this.validateToken()) {
                    this.initConfiguration();
                }
            });
    }

    private initConfiguration() {
        this.oAuthService.configure(authConfig);
        this.oAuthService.setupAutomaticSilentRefresh();
        this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
            if (this.validateToken()) {
                this.profile = this.oAuthService.getIdentityClaims();
                this.setGoogleUserData();
            }
        }, error => console.log('Error during login:', error));
    }

    login() {
        this.oAuthService.initImplicitFlow();
    }

    logout() {
        this.oAuthService.revokeTokenAndLogout().then(() => {
            this.router.navigate(['/login']);
        });
    }

    isLoggedIn(): boolean {
        return this.oAuthService.hasValidIdToken() &&
            this.oAuthService.hasValidAccessToken() &&
            this.oAuthService.getIdentityClaims() !== null;
    }

    private validateToken(): boolean {
        return this.oAuthService.hasValidIdToken() &&
            this.oAuthService.hasValidAccessToken();
    }

    private setGoogleUserData(): void {
        const googleUserData: GoogleUserData = this.mapProfileToGoogleUserData();
        this.store.dispatch(new SetGoogleUser(googleUserData));
        this.router.navigate(['/dashboard']);
    }

    private mapProfileToGoogleUserData(): GoogleUserData {
        return {
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
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}