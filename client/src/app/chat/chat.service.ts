import { Observable } from 'rxjs/Rx';
import { Message } from '../core/models/message.model';
import { FeathersSocketService } from '../core/services/feathers.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ChatService {
  service;

  constructor(private feathers: FeathersSocketService) { 
    this.service = this.feathers.getService('api/messages');
  }

  public postMessage(message: Message): Observable<Message> {
    let promise = this.service.create(message);

    return Observable.fromPromise(promise);
  }
}