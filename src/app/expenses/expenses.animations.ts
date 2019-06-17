import {
  trigger, transition, animate, style, query, group
} from '@angular/animations';


// Routable animations
export const slideInOutAnimation =
  trigger('slideInOutAnimation', [
    transition('* => *', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '100%' })
      ], { optional: true }),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('1000ms ease-out', style({ left: 0 }))
        ], { optional: true })
      ])
    ])
  ]);
