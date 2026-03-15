import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private collapsed = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this.collapsed.asObservable();

  toggleSidebar() {
    this.collapsed.next(!this.collapsed.value);
  }

  get isCollapsed() {
    return this.collapsed.value;
  }
}
