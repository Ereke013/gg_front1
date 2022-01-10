import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "@finance-web/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentEmployee = this.authenticationService.currentEmployeeValue;
    if (currentEmployee) {
      if (this.getIsSuccess(currentEmployee, route.data)) {
        // authorised so return true
        return true;
      }
      this.router.navigate([this.router.url]);
      return;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

  getIsSuccess(currentUser: any, accessRoles) {
    return currentUser && currentUser.roles && this.checkRoleSuccess(currentUser.roles, accessRoles);
  }

  checkRoleSuccess(userRoles: string[], accessRoles) {
    for (const role of userRoles) {
      if (accessRoles.roles.findIndex(f => f === role) !== -1) {
        return true;
      }
    }
    return false;
  }

}
