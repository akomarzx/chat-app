import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appChatModalAnchor]'
})
export class ChatModalAnchorDirective {

  constructor(public vcr: ViewContainerRef) { }

}
