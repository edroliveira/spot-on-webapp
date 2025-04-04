import { AuthConfig } from 'angular-oauth2-oidc';

// This is a stub for the auth-config.ts file

export const authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin,
    clientId: '<CLIENT_ID>', // This does not represent the real Client ID. Replace it with your own.
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
};