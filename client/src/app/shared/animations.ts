import { AnimationEntryMetadata } from '@angular/core/core';

import { trigger, state, animate, transition, style } from '@angular/animations';

/**
 * ROUTER ANIMATIONS
 */
export const fadeInAnimation: AnimationEntryMetadata =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('fadeInAnimation', [

      // route 'enter' transition
      transition(':enter', [

          // css styles at start of transition
          style({ opacity: 0 }),

          // animation and styles at end of transition
          animate('.3s', style({ opacity: 1 }))
      ]),
  ]);

export const messageAnimation: AnimationEntryMetadata = 

  trigger('messageAnimation', [
  
          // route 'enter' transition
          transition(':enter', [
  
              // css styles at start of transition
              style({ opacity: 0 }),
  
              // animation and styles at end of transition
              animate('.3s', style({ opacity: 1 }))
          ]),
          transition(':leave', [
            animate('.3s', style({opacity: 0, height: 0}))
          ])
      ]);

/**
 * NoOp
 */