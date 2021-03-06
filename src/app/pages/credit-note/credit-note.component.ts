import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-credit-note',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.css']
})
export class CreditNoteComponent implements OnInit {


  constructor(private r:Renderer2) { }


  ngOnInit() {
    this.r.addClass(document.body, "vertical-layout")
    this.r.addClass(document.body, "vertical-menu-modern")
    this.r.addClass(document.body,"boxicon-layout")
    this.r.addClass(document.body,"no-card-shadow")
    this.r.addClass(document.body,"2-column")
    this.r.addClass(document.body,"navbar-sticky")
    this.r.addClass(document.body,"footer-static")
    this.r.addClass(document.body,"bg-full-screen-image")
    this.r.addClass(document.body,"blank-page")
  }

  ngOnDestroy() {
    this.r.removeClass(document.body, "vertical-layout")
    this.r.removeClass(document.body, "vertical-menu-modern")
    this.r.removeClass(document.body,"boxicon-layout")
    this.r.removeClass(document.body,"no-card-shadow")
    this.r.removeClass(document.body,"2-column")
    this.r.removeClass(document.body,"navbar-sticky")
    this.r.removeClass(document.body,"footer-static")
    this.r.removeClass(document.body,"bg-full-screen-image")
    this.r.removeClass(document.body,"blank-page")
  }

}
