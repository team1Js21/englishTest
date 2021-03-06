import { environment } from 'src/environments/environment';
import {
  NOTIFICATION_PATH,
  PROFILE_PATH,
} from '../modules/profile/profile-routing.constants';
import { LogLevel } from './log-level';
import { OpenIdConfiguration } from './openid-configuration';

export const DEFAULT_CONFIG: OpenIdConfiguration = {
  authority: environment.auth_url,
  authWellknownEndpointUrl: `${environment.auth_url}/.well-known/openid-configuration`,
  // authWellknownEndpoints: null,
  redirectUrl: environment.local_url,
  clientId: 'client_tye',
  responseType: 'code',
  scope: 'openid role Front',
  hdParam: '',
  postLogoutRedirectUri: environment.local_url,
  startCheckSession: false,
  silentRenew: true,
  silentRenewUrl: environment.auth_url,
  silentRenewTimeoutInSeconds: 20,
  renewTimeBeforeTokenExpiresInSeconds: 0,
  useRefreshToken: true,
  usePushedAuthorisationRequests: false,
  ignoreNonceAfterRefresh: false,
  postLoginRoute: '/',
  forbiddenRoute: '/forbidden',
  unauthorizedRoute: '/unauthorized',
  autoUserInfo: false,
  autoCleanStateAfterAuthentication: true,
  triggerAuthorizationResultEvent: false,
  logLevel: LogLevel.Warn,
  issValidationOff: false,
  historyCleanupOff: false,
  maxIdTokenIatOffsetAllowedInSeconds: 120,
  disableIatOffsetValidation: false,
  storage: null,
  customParamsAuthRequest: {},
  customParamsRefreshTokenRequest: {},
  customParamsEndSessionRequest: {},
  customParamsCodeRequest: {},
  eagerLoadAuthWellKnownEndpoints: true,
  disableRefreshIdTokenAuthTimeValidation: false,
  enableIdTokenExpiredValidationInRenew: true,
  tokenRefreshInSeconds: 4,
  refreshTokenRetryInSeconds: 3,
  ngswBypass: false,
};
