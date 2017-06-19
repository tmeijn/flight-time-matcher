import { ChatService } from './chat.service';
import { FeathersSocketService } from '../core/services/feathers.service';
import { AddMessageAction, AddMessageSuccessAction, FetchMessageAction } from './chat.actions';
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
  constructor(public store: Store<State>, public feathers: FeathersSocketService, private chatService: ChatService) { }

  ngOnInit() { 
    this.messages$ = this.chatService.messages$;


    this.messages$ = this.messages$.map((data) => {
      console.log(Array.isArray(data));
      if (Array.isArray(data)) {
        console.log(data);
        data.sort(function(a, b) {
          console.log(a, b);
          return a.createdAt < b.createdAt ? 1 : -1;
        });
      }

      return data;
    });

    if(this.chatService.firstLoad) {
    this.store.dispatch(new FetchMessageAction(3));
    this.chatService.firstLoad = false;
    };

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
  }


  sendMessage() {
    this.store.dispatch(new AddMessageAction(this.newMessage));
    this.newMessage = new Message();
    //this.feathers.getService('api/messages').create(this.newMessage).then(result => console.log(result));
  }
}