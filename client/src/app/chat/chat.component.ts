import { Component, OnInit, OnDestroy } from '@angular/core';

// NgRx
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { getAllMessages, State } from '../app.reducers';
import { ActionTypes, AddMessageAction, AddMessageSuccessAction, FetchMessageAction } from './chat.actions';
import { Observable } from 'rxjs/Observable';

// Services
import { ChatService } from './chat.service';
import { FeathersSocketService } from '../core/services/feathers.service';

// Models
import { Message } from '../core/models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {

  public messages$: Observable<Message[]>;
  public newMessage: Message =  new Message();
  constructor(public store: Store<State>, public feathers: FeathersSocketService, private chatService: ChatService, private actions$: Actions) { }

  ngOnInit() { 
    this.messages$ = this.chatService.messages$;

    /** dispatch FetchMessageAction only on first component load */
    if(this.chatService.firstLoad) {
      this.store.dispatch(new FetchMessageAction(3, 4));
      this.chatService.firstLoad = false;
    };

    this.chatService.active = true;
  

  }

  ngOnDestroy() {
    this.chatService.active = false;
  }


  sendMessage() {
    this.store.dispatch(new AddMessageAction(this.newMessage));
    this.newMessage = new Message();
    //this.feathers.getService('api/messages').create(this.newMessage).then(result => console.log(result));
  }
}