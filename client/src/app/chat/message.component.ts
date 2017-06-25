import { User } from '../core/models/user.model';
import { fadeInAnimation } from '../shared/animations';
import { Message } from '../core/models/message.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  animations: [fadeInAnimation],
  host: { 
      '[@fadeInAnimation]': '',
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
                        <strong>{{ message.sentBy.username }}</strong> - <small>{{ message.createdAt | date:'shortTime' }}</small>
                        <br>
                        {{message.text}}
                    </p>
                </div>
            </div>
            <button *ngIf="message.userId === currentUser._id" class="delete"></button>
        </article>
    </div>
  `
})

export class MessageComponent implements OnInit {
  @Input() currentUser: User;
  @Input() message: Message;

  constructor() { }

  ngOnInit() { }
}