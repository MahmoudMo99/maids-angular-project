import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverEffect]',
})
export class HoverEffectDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setInitialStyles();
  }

  private setInitialStyles() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'transform 0.3s ease, box-shadow 0.3s ease'
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.applyHoverEffects();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeHoverEffects();
  }

  private applyHoverEffects() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.05)');
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      '0 4px 8px rgba(0, 0, 0, 0.2)'
    );
  }

  private removeHoverEffects() {
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
  }
}
