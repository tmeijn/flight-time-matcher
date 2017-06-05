import { User } from '../core/models/user.model';
import { type } from '../core/util';
import { Action } from '@ngrx/store';

export const ActionTypes = {
  AUTHENTICATE:           type('[users] Authenticate'), 
  AUTHENTICATED_ERROR:    type('[users] Authenticated Error '),
  AUTHENTICATED_SUCCESS:  type('[users] Authenticated Success '),
  AUTHENTICATED:          type('[users] Authenticated'),
  AUTHENTICATION_ERROR:   type('[users] Authentication Error'),
  AUTHENTICATION_SUCCESS: type('[users] Authentication Success'),
  SIGN_OUT:               type('[users] Sign out'),
  SIGN_OUT_ERROR:         type('[users] Sign Out Error'),
  SIGN_OUT_SUCCESS:       type('[users] Sign Out Success'),
  SIGN_UP:                type('[users] Sign Up'),
  SIGN_UP_ERROR:          type('[users] Sign Up Error'),
  SIGN_UP_SUCCESS:        type('[users] Sign Up Success'),
}

/**
 * Authenticate.
 * @class AuthenticateAction
 * @implements {Action}
 */
export class AuthenticateAction implements Action {
  public type: string = ActionTypes.AUTHENTICATE;

  constructor(public payload: {email: string, password: string}) {}
}

/**
 * Checks if user is authenticated.
 * @class AuthenticatedAction
 * @implements {Action}
 */
export class AuthenticatedAction implements Action {
  public type: string = ActionTypes.AUTHENTICATED;

  constructor(public payload?: {token?: string}) {}
}

/**
 * Authenticated check success.
 * @class AuthenticatedSuccessAction
 * @implements {Action}
 */
export class AuthenticatedSuccessAction implements Action {
  public type: string = ActionTypes.AUTHENTICATED_SUCCESS;

  constructor(public payload: {authenticated: boolean, user: User}) {}
}

/**
 * Authenticated check error.
 * @class AuthenticatedErrorAction
 * @implements {Action}
 */
export class AuthenticatedErrorAction implements Action {
  public type: string = ActionTypes.AUTHENTICATED_ERROR;

  constructor(public payload?: any) {}
}

/**
 * Authentication error.
 * @class AuthenticationErrorAction
 * @implements {Action}
 */
export class AuthenticationErrorAction implements Action {
  public type: string = ActionTypes.AUTHENTICATION_ERROR;

  constructor(public payload?: any) {}
}

/**
 * Authentication success.
 * @class AuthenticationSuccessAction
 * @implements {Action}
 */
export class AuthenticationSuccessAction implements Action {
  public type: string = ActionTypes.AUTHENTICATION_SUCCESS;

  constructor(public payload: { user: User }) {}
}

/**
 * Sign out.
 * @class SignOutAction
 * @implements {Action}
 */
export class SignOutAction implements Action {
  public type: string = ActionTypes.SIGN_OUT;
  constructor(public payload?: any) {}
}

/**
 * Sign out error.
 * @class SignOutErrorAction
 * @implements {Action}
 */
export class SignOutErrorAction implements Action {
  public type: string = ActionTypes.SIGN_OUT_SUCCESS;
  constructor(public payload?: any) {}
}

/**
 * Sign out success.
 * @class SignOutSuccessAction
 * @implements {Action}
 */
export class SignOutSuccessAction implements Action {
  public type: string = ActionTypes.SIGN_OUT_SUCCESS;
  constructor(public payload?: any) {}
}

/**
 * Sign up.
 * @class SignUpAction
 * @implements {Action}
 */
export class SignUpAction implements Action {
  public type: string = ActionTypes.SIGN_UP;
  constructor(public payload: { user: User }) {}
}

/**
 * Sign up error.
 * @class SignUpErrorAction
 * @implements {Action}
 */
export class SignUpErrorAction implements Action {
  public type: string = ActionTypes.SIGN_UP_ERROR;
  constructor(public payload?: any) {}
}

/**
 * Sign up success.
 * @class SignUpSuccessAction
 * @implements {Action}
 */
export class SignUpSuccessAction implements Action {
  public type: string = ActionTypes.SIGN_UP_SUCCESS;
  constructor(public payload: { user: User }) {}
}

export type Actions = 
  AuthenticateAction
  | AuthenticatedErrorAction
  | AuthenticatedSuccessAction
  | AuthenticationErrorAction
  | AuthenticationSuccessAction
  | SignUpAction
  | SignUpErrorAction
  | SignUpSuccessAction

   

  
       

       
        
      

         