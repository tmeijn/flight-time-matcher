import { User } from '../core/models/user.model';
import { OnInit } from '@angular/core/core';
import { AddMessageSuccessAction, FetchMessageAction } from './chat.actions';
import { getAllMessages, getAuthenticatedUser, State } from '../app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Message } from '../core/models/message.model';
import { FeathersSocketService } from '../core/services/feathers.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class ChatService {
  service;

  firstLoad: boolean = true;
  messages$: Observable<Message[]>;

  constructor(private feathers: FeathersSocketService, public store: Store<State>) { 
    this.service = this.feathers.getService('api/messages');
    
    this.messages$ = this.store.select(getAllMessages);
    
  }

  public fetchMessages(amount: number): Observable<Message[]> {
    let promise = this.service.find({query: { $limit: amount, $sort: { createdAt: -1 }  }});

    return Observable.fromPromise(promise);
  }

  public postMessage(message: Message): Observable<Message> {
    let promise = this.service.create(message);

    return Observable.fromPromise(promise);
  }

  private socketCreated(): void {
    this.service.on('created', (message: Message) => {
        this.store.dispatch(new AddMessageSuccessAction(message));
    });
  }
}