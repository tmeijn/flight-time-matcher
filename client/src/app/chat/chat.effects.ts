import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { ChatService } from './chat.service';
import { Injectable } from '@angular/core';

//RxJS
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import * as chatActions from './chat.actions';
let actionTypes = chatActions.ActionTypes;

@Injectable()
export class ChatEffects {

  /**
   * @constructor
   * @param {Actions} actions$ 
   * @param {ChatService} chatService 
   */
  constructor(
    private actions$: Actions,
    private chatService: ChatService
  ) { }

  /**
   * Post new message to server.
   */
  @Effect()
  public authenticate: Observable<Action> = this.actions$
    .ofType(actionTypes.ADD_MESSAGE)
    .map(toPayload)
    .switchMap(payload => {
      return this.chatService.postMessage(payload)
      .map(message => new chatActions.AddMessageSuccessAction(message))
      .catch(error => {
          //==========================
          // TODO: HACK => seems to fix the issue with Zone.js not being able to transition the task to running.
          // Should be revisited each Angular upgrade.
          //==========================
          let newError = {
            message: error.message
          }
          return Observable.of(new chatActions.AddMessageFailedAction({ error: newError }))
        });
    });

    @Effect()
    public fetchMessages: Observable<Action> = this.actions$
      .ofType(actionTypes.FETCH_MESSAGES)
      .map(toPayload)
      .switchMap(payload => {
        return this.chatService.fetchMessages(payload)
        .map(messages => {console.log(messages); return new chatActions.FetchMessageSuccessAction(messages)})
        .catch(error => {
          //==========================
          // TODO: HACK => seems to fix the issue with Zone.js not being able to transition the task to running.
          // Should be revisited each Angular upgrade.
          //==========================
          let newError = {
            message: error.message
          }
          return Observable.of(new chatActions.AddMessageFailedAction({ error: newError }))
        });
      })
}