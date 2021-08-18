import { LogLevel } from './log-level';
import { OpenIdConfiguration } from './openid-configuration';

export const DEFAULT_CONFIG: OpenIdConfiguration = {
  authority: 'https://localhost:5001',
  authWellknownEndpointUrl: 'https://localhost:5001/.well-known/openid-configuration',
  // authWellknownEndpoints: null,
  redirectUrl: 'https://localhost:4200/account',
  clientId: 'client_tye',
  responseType: 'code',
  scope: 'openid profile role Front',
  hdParam: '',
  postLogoutRedirectUri: 'https://localhost:4200/account',
  startCheckSession: false,
  silentRenew: true,
  silentRenewUrl: 'https://localhost:5001',
  silentRenewTimeoutInSeconds: 20,
  renewTimeBeforeTokenExpiresInSeconds: 0,
  useRefreshToken: true,
  usePushedAuthorisationRequests: false,
  ignoreNonceAfterRefresh: false,
  postLoginRoute: '/',
  forbiddenRoute: '/forbidden',
  unauthorizedRoute: '/unauthorized',
  autoUserInfo: true,
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
