import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighSalary]',
  standalone: true
})
export class HighSalaryDirective implements OnInit {
  @Input('appHighSalary') salary!: number;
  private threshold = 80000;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.salary > this.threshold) {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'darkgreen');
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#e6ffe6');
      this.renderer.setStyle(this.el.nativeElement, 'padding', '2px 4px');
      this.renderer.setStyle(this.el.nativeElement, 'border-radius', '4px');
    }
  }
}
