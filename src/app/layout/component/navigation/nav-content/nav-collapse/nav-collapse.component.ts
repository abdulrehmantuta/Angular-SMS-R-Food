import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationItem } from 'src/app/layout/interfaces/navigation';

@Component({
  selector: 'app-nav-collapse',
  templateUrl: './nav-collapse.component.html',
  styleUrls: ['./nav-collapse.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', display: 'block' }),
        animate('250ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [animate('250ms ease-in', style({ transform: 'translateY(-100%)' }))])
    ])
  ]
})
export class NavCollapseComponent {


  @Output() showCollapseItem: EventEmitter<object> = new EventEmitter();

  // all Version Get Item(Component Name Take)
  @Input() item!: NavigationItem;

  windowWidth: number;

  // Constructor
  constructor() {
    this.windowWidth = window.innerWidth;
  }

  // public method
  navCollapse(e: MouseEvent) {
    let parent = e.target as HTMLElement;

    if (parent?.tagName === 'SPAN') {
      parent = parent.parentElement!;
    }

    if (!parent || !parent.parentElement) return;

    parent = parent.parentElement as HTMLElement;

    const sections = Array.from(document.querySelectorAll('.coded-hasmenu')) as HTMLElement[];
    sections.forEach(section => {
      if (section !== parent) {
        section.classList.remove('coded-trigger');
      }
    });

    let firstParent = parent.parentElement;
    while (firstParent && firstParent.classList.contains('coded-hasmenu')) {
      firstParent.classList.add('coded-trigger');
      firstParent = firstParent.parentElement?.parentElement as HTMLElement;
    }

    parent.classList.toggle('coded-trigger');
  }


  // for Compact Menu
  subMenuCollapse(item: object) {
    this.showCollapseItem.emit(item);
  }
}
