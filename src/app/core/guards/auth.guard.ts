import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoggedUserService, PermissionsService } from '..';
import { LoggedUser } from '../model/user/logged-user';
import { map } from 'rxjs/operators';
import { User } from '../model/user/user';
import { ActionPermission } from '../model/user/action-permission';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
    loggedUser: LoggedUser;

    constructor(
        private router: Router,
        private loggedUserService: LoggedUserService,
        private permissionsService: PermissionsService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const url = state.url;
        const path = next.routeConfig.path;
        return this.canPathBeActivated(path, url);
    }

    canPathBeActivated(path, url): Observable<boolean> {
        console.warn('checking ', path, url);
        if ('admin' === path) {
            return this.canExecuteManagerTasks();
        }
        if (url.indexOf('/admin/') >= 0) {
            if (url.indexOf(PermissionsService.REGISTER_USER)) {
                return this.canManageUsers();
            } else {
                console.warn('No evaluation yet for this task', url);
                return of(false);
            }
            return this.permissionsService.evaluatePermission(path);
        } else {
            return of(true);
        }
    }

    canExecuteManagerTasks() {
        return this.loggedUserService.getLoggerUser().pipe(
            map(data => {
                return PermissionsService.canExecuteManagerTasks(data);
            })
        );
    }

    canManageUsers() {
        return this.loggedUserService.getLoggerUser().pipe(
            map(data => {
                return PermissionsService.canManageUsers(data);
            })
        );
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> {
        const path = route.path;

        return this.loggedUserService.getLoggerUser().pipe(
            map(user => {
                if (user) {
                    return this.canPathBeLoaded(user, path);
                } else {
                    return false;
                }
            })
        );
    }

    canPathBeLoaded(loggedUser: User, path): boolean {
        let canVisit: boolean;
        if ('admin' === path) {
            if (loggedUser) {
                // const actionPermission: ActionPermission =
                //     loggedUser.actionPermissions.find(x => x.actionName === 'executeManagerTasks');
                canVisit = PermissionsService.canExecuteManagerTasks(loggedUser);
                // canVisit = actionPermission.value;
            } else {
                canVisit = false;
            }
        } else {
            canVisit = true;
        }
        return canVisit;
    }

    redirectToLoginPage(url) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
    }
}
