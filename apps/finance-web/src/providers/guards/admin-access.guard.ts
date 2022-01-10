import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "@finance-web/services/authentication.service";
import {disableNavigateOnRole} from "@finance-web/app/shares/util-method";

@Injectable({
  providedIn: 'root'
})
export class AdminAccessGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentEmployee = this.authenticationService.currentEmployeeValue;
    if (currentEmployee) {
      if (this.getIsSuccess(currentEmployee, route.data)) {
        return true;
      }
      const navigations = disableNavigateOnRole(this.authenticationService.currentEmployeeValue);
      if(navigations?.length > 0){
        this.router.navigate([navigations[0].url]).then();
        return;
      }
    }

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
