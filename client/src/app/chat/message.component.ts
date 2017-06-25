import { User } from '../core/models/user.model';
import { fadeInAnimation, messageAnimation } from '../shared/animations';
import { Message } from '../core/models/message.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  animations: [messageAnimation],
  host: { 
      '[@messageAnimation]': '',
      'style' : 'display: block;'
   },
  template: `
    <div class="box" style="margin-bottom: 20px;">
        <article class="media">
            <div class="media-left">
                <figure class="image is-64x64">
                    <img src="https://randomuser.me/api/portraits/med/men/83.jpg" alt="Image">
                </figure>
            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>{{ message.sentBy.username }}</strong> - <small>{{ message.createdAt | date:'shortTime' }}</small><span *ngIf="deleting" style="color: red;"> deleting message...</span>
                        <br>
                        {{message.text}}
                    </p>
                </div>
            </div>
            <button *ngIf="message.userId === currentUser._id" class="delete" (click)="delete()"></button>
        </article>
    </div>
  `
})

export class MessageComponent implements OnInit {
  @Input() currentUser: User;
  @Input() message: Message;

  @Output() deleteMessage = new EventEmitter();

  deleting: boolean = false;

  constructor() {
   }

  ngOnInit() { }

  public delete(): void {
    this.deleteMessage.emit(this.message)
    this.deleting = true;
  }
}