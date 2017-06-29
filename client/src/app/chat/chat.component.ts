import { Component, OnInit, OnDestroy } from '@angular/core';

// NgRx
import { Store } from '@ngrx/store';
import { getAllMessages, getAuthenticatedUser, State } from '../app.reducers';
import {
  ActionTypes,
  AddMessageAction,
  AddMessageSuccessAction,
  DeleteMessageAction,
  FetchMessageAction,
  UpdateMessageAction
} from './chat.actions';
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

  private _loaded: boolean = false;

  constructor(
    public store: Store<State>,
    private chatService: ChatService) { }

  ngOnInit() { 
    this.messages$ = this.chatService.messages$;
    this.store.select(state => state.chat.loaded).subscribe(loaded => this._loaded = loaded);

    /** dispatch FetchMessageAction only on first component load */
    if(!this._loaded) {
      this.store.dispatch(new FetchMessageAction());
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

  public deleteMessage(event) {
    this.store.dispatch(new DeleteMessageAction(event));
  }

  public patchMessage(event) {
    this.store.dispatch(new UpdateMessageAction(event));
  }

  public sendMessage() {
    this.store.dispatch(new AddMessageAction(this.newMessage));
    this.newMessage = new Message();
    //this.feathers.getService('api/messages').create(this.newMessage).then(result => console.log(result));
  }

  protected trackByFn(index, item) {
    return item._id;
  }

}