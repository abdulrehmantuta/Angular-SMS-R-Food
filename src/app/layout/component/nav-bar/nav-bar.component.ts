import { Component, EventEmitter, HostListener, Output, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() navCollapsed: boolean = false;
  @Output() navCollapsedChange = new EventEmitter<boolean>();
  @Output() NavCollapsedMob = new EventEmitter<void>();
  @Output() NavCollapse = new EventEmitter<void>();
  windowWidth: number;
  shooping: boolean = false;

  constructor(
    private _Route: Router,
  ) {
    this.windowWidth = window.innerWidth;
  }
  ngOnInit(): void {
    if(this._Route.url === "/Order/Created"){
      this.shooping = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    const newWindowWidth = event.target.innerWidth;
    this.windowWidth = newWindowWidth;
  }

  navCollapse() {
    if (this.windowWidth >= 1025) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }
  
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.altKey && event.code === 'KeyC') {
      event.preventDefault();
      this.openOffCanvas();
    }
  }

  openOffCanvas() {
    let offcanvasElement = document.getElementById('offcanvasRight');
    if (offcanvasElement) {
      const bootstrap = (window as any).bootstrap;  // 👈 Yeh line `bootstrap` ko access karti hai
      let offcanvas = new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    }
  }
}