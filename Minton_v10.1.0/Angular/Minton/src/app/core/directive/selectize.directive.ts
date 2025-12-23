import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core'

declare var $: any

@Directive({
  selector: '[appSelectize]',
  standalone: true,
})
export class SelectizeDirective implements AfterViewInit {
  @Input() selectizeOptions: any

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    $(this.el.nativeElement).selectize(this.selectizeOptions || {})
  }
}
