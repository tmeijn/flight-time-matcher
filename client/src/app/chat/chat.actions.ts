import { Message } from '../core/models/message.model';
import { Action } from '@ngrx/store';
import { type } from '../core/util';
/**
 * delete message
 * update message
 * add message
 */
const ACTION_CATEGORY = '[chat]';

export const ActionTypes = {
  ADD_MESSAGE: type(`${ACTION_CATEGORY} Add Message`),
  ADD_MESSAGE_SUCCESS: type(`${ACTION_CATEGORY} Add Message Success`),
  ADD_MESSAGE_FAILED: type(`${ACTION_CATEGORY} Add Message Failed`),
  DELETE_MESSAGE: type(`${ACTION_CATEGORY} Delete Message`),
  DELETE_MESSAGE_SUCCESS: type(`${ACTION_CATEGORY} Delete Message Success`),
  DELETE_MESSAGE_FAILED: type(`${ACTION_CATEGORY} Delete Message Failed`),
  FETCH_MESSAGES: type(`${ACTION_CATEGORY} Fetch Messages`),
  FETCH_MESSAGES_SUCCESS: type(`${ACTION_CATEGORY} Fetch Message Success`),
  FETCH_MESSAGES_FAILED: type(`${ACTION_CATEGORY} Fetch Message Failed`),
  UPDATE_MESSAGE: type(`${ACTION_CATEGORY} Update Message`),
  UPDATE_MESSAGE_SUCCESS: type(`${ACTION_CATEGORY} Update Message Success`),
  UPDATE_MESSAGE_FAILED: type(`${ACTION_CATEGORY} Update Message Failed`),
}

/**
 * Add Message to collection Actions
 */
export class AddMessageAction implements Action {
  public type: string = ActionTypes.ADD_MESSAGE;

  constructor(public payload: Message) {}
}

export class AddMessageSuccessAction implements Action {
  public type: string = ActionTypes.ADD_MESSAGE_SUCCESS;

  constructor(public payload: Message) {}
}

export class AddMessageFailedAction implements Action {
  public type: string = ActionTypes.ADD_MESSAGE_FAILED;

  constructor(public payload?: any) {}
}

/**
 * Fetch Message Actions
 */
export class FetchMessageAction implements Action {
  public type: string = ActionTypes.FETCH_MESSAGES;

  constructor(public payload: any = 25) {}
}

export class FetchMessageSuccessAction implements Action {
  public type: string = ActionTypes.FETCH_MESSAGES_SUCCESS;

  constructor(public payload: Array<Message>) {}
}

export class FetchMessageFailedAction implements Action {
  public type: string = ActionTypes.FETCH_MESSAGES_FAILED;

  constructor(public payload?: any) {}
}

export type Actions = 
  AddMessageAction
  | AddMessageSuccessAction
  | AddMessageFailedAction
  | FetchMessageAction
  | FetchMessageSuccessAction
  | FetchMessageFailedAction
