
import { User } from '../core/models/user.model';
import { fadeInAnimation, messageAnimation } from '../shared/animations';
import { Message } from '../core/models/message.model';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

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
                        <strong>{{ message.sentBy.username }}</strong> - <small>{{ message.createdAt | date:'shortTime' }}</small>
                        <span *ngIf="message.createdAt !== message.updatedAt" style="color: gray;"><small>(edited at {{ message.updatedAt | date:'shortTime' }})</small></span>
                        <span *ngIf="deleting" style="color: red;"> deleting message...</span>
                        <button *ngIf="message.userId === currentUser._id && !editing" class="button is-link is-small" (click)="editing = !editing">Edit</button>
                        <br />
                        <span *ngIf="!editing">{{message.text}}</span>
                        <span *ngIf="editing">
                          <div class="field">
                            <p class="control is-expanded">
                              <textarea [(ngModel)]="messageHolder.text" type="text" class="textarea" maxlength="400"></textarea>                          
                            </p>
                          <div class="field is-grouped">
                            <p class="control">
                              <button class="button is-outlined" (click)="editing = false">Cancel</button>
                            </p>
                            <p class="control">
                              <button class="button is-success" (click)="editing = !editing; patch()">Save Changes</button>
                            </p>
                          </div>
                          </div>
                        </span>
                    </p>
                </div>
            </div>
            <button *ngIf="message.userId === currentUser._id" class="delete" (click)="delete()"></button>
        </article>
    </div>
  `
})

export class MessageComponent implements OnInit, OnChanges {
  /** Holds the injected message to be able to edit the message */
  public messageHolder: Message;

  /** The authenticated user */
  @Input() currentUser: User;

  /** The chat message */
  @Input() message: Message;

  /** Delete message event */
  @Output() deleteMessage = new EventEmitter();

  /** Delete message event */
  @Output() patchMessage = new EventEmitter();

  /** UI STATE: show deleting message */
  public deleting: boolean = false;

  /** UI STATE: edit message */
  public editing: boolean = false;

  constructor() {
   }

  ngOnInit() {
   }

   ngOnChanges() {
     this.messageHolder = Object.assign({}, this.message);
   }

  /**
   * Emit deleteMessage event with the current message.
   */
  public delete(): void {
    this.deleteMessage.emit(this.message)
    this.deleting = true;
  }

  /**
   * Emit patchMessage event with the edited message.
   */
  public patch(): void {
    this.patchMessage.emit(this.messageHolder)
    this.editing = false;
  }
}