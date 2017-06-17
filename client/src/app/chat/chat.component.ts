import { FeathersSocketService } from '../core/services/feathers.service';
import { AddMessageAction, AddMessageSuccessAction } from './chat.actions';
import { Message } from '../core/models/message.model';
import { Observable } from 'rxjs/Rx';
import { getAllMessages, State } from '../app.reducers';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit {

  public messages$: Observable<Message[]>;
  public newMessage: Message =  new Message();
  constructor(public store: Store<State>, public feathers: FeathersSocketService) { }

  ngOnInit() { 
    this.messages$ = this.store.select(getAllMessages);

    const payload = {
      _id: '1',
      text: 'test',
      sentBy: {
        avatar: 'test',
        email: 'test@test.com',
        username: 'test_user'
      },
      createdAt: new Date()
    };

    this.store.dispatch(new AddMessageSuccessAction(payload));
    this.store.dispatch(new AddMessageSuccessAction(payload));
  }


  sendMessage() {
    this.store.dispatch(new AddMessageAction(this.newMessage));
    this.newMessage = new Message();
    //this.feathers.getService('api/messages').create(this.newMessage).then(result => console.log(result));
  }
}