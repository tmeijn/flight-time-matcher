import { Component, OnInit, OnDestroy } from '@angular/core';

// NgRx
import { Store } from '@ngrx/store';
import { getAllMessages, getAuthenticatedUser, State } from '../app.reducers';
import { ActionTypes, AddMessageAction, AddMessageSuccessAction, FetchMessageAction } from './chat.actions';
import { Observable } from 'rxjs/Observable';

// Services
import { ChatService } from './chat.service';

// Models
import { Message } from '../core/models/message.model';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {

  public messages$: Observable<Message[]>;
  public newMessage: Message =  new Message();
  public currentUser: User;

  constructor(
    public store: Store<State>,
    private chatService: ChatService) { }

  ngOnInit() { 
    this.messages$ = this.chatService.messages$;

    /** dispatch FetchMessageAction only on first component load */
    if(this.chatService.firstLoad) {
      this.store.dispatch(new FetchMessageAction());
      this.chatService.firstLoad = false;
    };

    /** set component state to active */
    this.chatService.active = true;

    /** retrieve current user from store */
    this.store.select(getAuthenticatedUser).subscribe(user => {
      this.currentUser = user;
    });
  

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