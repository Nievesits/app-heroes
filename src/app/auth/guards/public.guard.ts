import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, UrlSegment } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated:', isAuthenticated)),
      tap( isAuthenticated => {
        if( isAuthenticated) {this.router.navigate(['./'])}
      }),
      map( isAuthenticated => !isAuthenticated)
    )


  }
  canMatch = (route: ActivatedRouteSnapshot, segments: UrlSegment[]): boolean | Observable<boolean> => {
    console.log('Can Match');
    console.log({ route, segments })
    return this.checkAuthStatus();
  };

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>  {
    console.log('Can Activate');
    console.log({ route, state });
    return this.checkAuthStatus();

  }
}
