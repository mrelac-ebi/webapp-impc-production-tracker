import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from '../model/conf/permission';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {ConfigAssetLoaderService} from './config-asset-loader.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private url;

  // Paths
  static readonly REGISTER_USER = 'register-user';
  static readonly EXECUTE_MANAGER_TASKS = 'execute-manager-tasks';

  // Actions
  static readonly UPDATE_PLAN_ACTION = 'canUpdatePlan';
  static readonly UPDATE_PROJECT_ACTION = 'canUpdateProject';

  constructor(private http: HttpClient, private configAssetLoaderService: ConfigAssetLoaderService) {
    this.configAssetLoaderService.loadConfigurations().subscribe(data => this.url = data.appServerUrl);
  }

  // Returns an object with permissions for the logged user.
  getPermissions() {
    return this.http.get<Permission>(this.url + '/api/permissions');
  }

  // Returns if an action over an object is allowed.
  getPermissionByActionOnResource(action: string, resourceId: string) {
    return this.http.get<boolean>(this.url + '/api/permissionByActionOnResource?action=' + action + '&resourceId=' + resourceId );
  }

  evaluatePermission(path: string): Observable<boolean> {
    let hasPermission: boolean;
    return this.getPermissions().pipe(map(v => {
      switch (path) {
        case PermissionsService.REGISTER_USER:
          hasPermission = v.canRegisterUser;
          break;
        case PermissionsService.EXECUTE_MANAGER_TASKS:
          hasPermission = v.canExecuteManagerTasks;
          break;
        default:
          hasPermission = false;
      }
      return hasPermission;
    }));
  }

  evaluatePermissionByActionOnResource(action: string, resourceId: string): Observable<boolean> {
    return this.getPermissionByActionOnResource(action, resourceId);
  }
}
