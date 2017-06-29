import { storeFreeze } from 'ngrx-store-freeze/dist';
import { compose } from '@ngrx/core';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';
// Reselect
import { createSelector } from "reselect";

// @NgRx

// Environment
import { environment } from "../environments/environment";

// Import Reducers
import * as users from "./users/users.reducers";
import * as chat from './chat/chat.reducer';

// Global state interface
export interface State {
  router: RouterState;
  users: users.State;
  chat: chat.State
}

// Reducers
const reducers = {
  router: routerReducer,
  users: users.reducer,
  chat: chat.reducer
};



// Development reducer includes storeFreeze to prevent state from being mutated.
const developmentReducer: ActionReducer<State> = 
  compose(storeFreeze, combineReducers)(reducers);

// Production Reducer
const productionReducer: ActionReducer<State> =
  combineReducers(reducers);

export function reducer(state: any, action: any) {
  // Reset state when user logs out
  if(action.type === '[users] Sign Out Success') {
    state = undefined;
  }

  if(environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

// ==============================================
// User Selector functions
// ==============================================

/**
 * Returns the user state.
 * @function getUserState
 * @param {State} state Top level state.
 * @return {State}
 */
export const getUsersState = (state: State) => state.users;

/**
 * Returns the authenticated user
 * @function getAuthenticatedUser
 * @param {State} state
 * @param {any} props
 * @return {User}
 */
export const getAuthenticatedUser = createSelector(getUsersState, users.getAuthenticatedUser);

/**
 * Returns the authentication error.
 * @function getAuthenticationError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getAuthenticationError = createSelector(getUsersState, users.getAuthenticationError);

/**
 * Returns true if the user is authenticated
 * @function isAuthenticated
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticated = createSelector(getUsersState, users.isAuthenticated);

/**
 * Returns true if the user is authenticated
 * @function isAuthenticated
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticatedLoaded = createSelector(getUsersState, users.isAuthenticatedLoaded);

/**
 * Returns true if the authentication request is loading.
 * @function isAuthenticationLoading
 * @param {State} state
 * @param {any} props
 * @return {boolean}
 */
export const isAuthenticationLoading = createSelector(getUsersState, users.isLoading);

/**
 * Returns the sign out error.
 * @function getSignOutError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getSignOutError = createSelector(getUsersState, users.getSignOutError);

/**
 * Returns the sign up error.
 * @function getSignUpError
 * @param {State} state
 * @param {any} props
 * @return {Error}
 */
export const getSignUpError = createSelector(getUsersState, users.getSignUpError);

// ==============================================
// Chat Selector functions
// ==============================================


export const getChatState = (state: State) => state.chat;

/**
 * Returns all messages in the store.
 * @function getAllMessages
 * @param {State} state
 * @returns {[Message]}
 */
export const getAllMessages = createSelector(getChatState, chat.getAllMessages);

