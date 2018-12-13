import {
  Component,
  Input,
  EventEmitter,
  Output,
  HostListener,
  OnInit,
} from '@angular/core';

import {
  ReuseContextCloseEvent,
  ReuseItem,
  CloseType,
} from './reuse-tab.interfaces';
import { LocalizationService } from 'yoyo-ng-module/src/abp';

@Component({
  selector: 'reuse-tab-context-menu',
  template: `
  <ul nz-menu>
      <li nz-menu-item (click)="click($event, 'close')" data-type="close" [nzDisabled]="!item.closable" [innerHTML]="l('ReuseTabClose')"></li>
      <li nz-menu-item (click)="click($event, 'closeOther')" data-type="closeOther" [innerHTML]="l('ReuseTabCloseOther')"></li>
      <li nz-menu-item (click)="click($event, 'closeRight')" data-type="closeRight" [nzDisabled]="item.last" [innerHTML]="l('ReuseTabCloseRight')"></li>
      <li nz-menu-item (click)="click($event, 'clear')" data-type="clear" [innerHTML]="l('ReuseTabClear')"></li>
  </ul>`,
  preserveWhitespaces: false,
})
export class ReuseTabContextMenuComponent implements OnInit {
 
  @Input()
  item: ReuseItem;

  @Input()
  event: MouseEvent;

  @Output()
  readonly close = new EventEmitter<ReuseContextCloseEvent>();

  get includeNonCloseable() {
    return this.event.ctrlKey;
  }

  constructor(private _localizationService: LocalizationService) {
    _localizationService.l('')
  }

  private notify(type: CloseType, item: ReuseItem) {
    this.close.next({
      type,
      item: this.item,
      includeNonCloseable: this.includeNonCloseable,
    });
  }

  ngOnInit(): void {
    if (this.includeNonCloseable) this.item.closable = true;
  }

  click(e: MouseEvent, type: CloseType) {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'close' && !this.item.closable) return;
    if (type === 'closeRight' && this.item.last) return;
    this.notify(type, this.item);
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:contextmenu', ['$event'])
  closeMenu(event: MouseEvent): void {
    if (event.type === 'click' && event.button === 2) return;
    this.notify(null, null);
  }

  l(key: string): string {
    return this._localizationService.l(key);
  }
}
