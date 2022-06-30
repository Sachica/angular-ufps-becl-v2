import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { User } from '@data/models';
import { AuthService } from '@modules/auth/services/auth.service';

@Directive({
  selector: '[appPermissions]'
})
export class PermissionsDirective implements OnInit, OnDestroy {

  private currentUser: User;
  private permissions: string[];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((user: User) => {
        this.currentUser = user;
        this.updateView();
      });
  }

  @Input()
  set appPermissions(permissions: string[]) {
    this.permissions = permissions;
    this.updateView();
  }

  private updateView(): void {
    if (this.currentUser && this.hasPermissions()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private hasPermissions(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const hasPermissions = this.permissions.every(permission => this.authService.checkPermission(permission));
    return isLoggedIn && hasPermissions;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
