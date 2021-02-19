import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(private r:Renderer2) { }
  ngOnInit() {
    this.r.addClass(document.body, "vertical-layout")
    this.r.addClass(document.body, "vertical-menu-modern")
    this.r.addClass(document.body,"boxicon-layout")
    this.r.addClass(document.body,"no-card-shadow")
    this.r.addClass(document.body,"2-columns")
    this.r.addClass(document.body,"navbar-sticky")
    this.r.addClass(document.body,"footer-static")
  }

  ngOnDestroy() {
    this.r.removeClass(document.body, "vertical-layout")
    this.r.removeClass(document.body, "vertical-menu-modern")
    this.r.removeClass(document.body,"boxicon-layout")
    this.r.removeClass(document.body,"no-card-shadow")
    this.r.removeClass(document.body,"2-columns")
    this.r.removeClass(document.body,"navbar-sticky")
    this.r.removeClass(document.body,"footer-static")
  }
}
