import { Component, OnInit } from '@angular/core';
import {MenuItems} from '../../models/breadcrumb-model';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter} from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb-menu',
  templateUrl: './breadcrumb-menu.component.html',
  styleUrls: ['./breadcrumb-menu.component.css']
})
export class BreadcrumbMenuComponent implements OnInit {

  breadcrumbs: MenuItems[] = [];
  private static ROUTE_DATA_BREADCRUMB: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.breadcrumbs = this.createBreadcrumbs(this.route.root);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.route.root);
    })
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = ' ',breadcrumbs: MenuItems[] = [] ): MenuItems[] {
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb: '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path: '';

    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');

    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart,route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }

    const  nextUrl = path ? `${url}/${path}`: url;
    const breadcrumb: MenuItems = {
      label: label,
      url: nextUrl

    };

    const newBreadcrumbs = breadcrumb.label  ? [ ...breadcrumbs,breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild,nextUrl,newBreadcrumbs);
    }
    return newBreadcrumbs;
  }


}
