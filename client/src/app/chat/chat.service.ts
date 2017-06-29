import { Injectable } from '@angular/core';

//NgRx
import { Store } from '@ngrx/store';
import { getAllMessages, State } from '../app.reducers';
import { AddMessageSuccessAction, FetchMessageAction, UpdateMessageSuccessAction, DeleteMessageSuccessAction } from './chat.actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

// Services
import { FeathersSocketService } from '../core/services/feathers.service';

//Models
import { Message } from '../core/models/message.model';

@Injectable()
export class ChatService {
  /**
   * Feathers service instance
   * TODO: Find a typescript defintion of a feathers service.
   */
  service: any;

  /** Holds the state of the chat component => if it is currently loaded */
  active: boolean;

  /** All the messages in the Store */
  messages$: Observable<Message[]>;

  constructor(private feathers: FeathersSocketService, public store: Store<State>) { 
    this.service = this.feathers.getService('api/messages');
    
    this.messages$ = this.store.select(getAllMessages);

    this.socketInit();
  }

  /**
   * Post message to the server
   * @param {Message} message message to be posted.
   */
  public deleteMessage(message: Message): Observable<Message> {
    let promise = this.service.remove(message);

    return Observable.fromPromise(promise);
  }


  /**
   * Fetch messages from the server
   * @param {Object} payload
   * @param {number} payload.payload the amount of messages to retrieve
   * @param {number} payload.skip the amount of messages to skip
   * @returns {Observable}
   */
  public fetchMessages(payload: any): Observable<Message[]> {
    let promise = this.service.find({query: { $limit: payload.payload, $skip: payload.skip, $sort: { createdAt: -1 }  }});

    return Observable.fromPromise(promise);
  }

  /**
   * Patch message on the server
   * @param {Message} message message to be patched.
   */
  public patchMessage(message: Message): Observable<Message> {
    let promise = this.service.patch(message._id, {text: message.text});

    return Observable.fromPromise(promise);
  }

  /**
   * Post message to the server
   * @param {Message} message message to be posted.
   */
  public postMessage(message: Message): Observable<Message> {
    let promise = this.service.create(message);

    return Observable.fromPromise(promise);
  }

  /**
   * Creates eventListeners for the Feathers socket events.
   */
  private socketInit(): void {
    this.service.on('created', (message: Message) => {
        this.store.dispatch(new AddMessageSuccessAction(message));
    });
    this.service.on('patched', (message: Message) => {
        this.store.dispatch(new UpdateMessageSuccessAction(message));
    });
    this.service.on('removed', (message: Message) => {
        this.store.dispatch(new DeleteMessageSuccessAction(message));
    });
  }
}