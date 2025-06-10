import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { AsyncPipe } from '@angular/common';
import { distinctUntilChanged, Observable } from 'rxjs';
import { GoogleUserData } from '../../models/google-user-data';
import { GoogleUserState } from '../../state/google-user-state';
import { select, Store } from '@ngxs/store';
import { HeaderComponent } from '../header/header.component';
import { SharedModule } from '../shared/shared.module';
import { SidenavState } from '../../state/sidenav-state';
import { SetToggleSidenav } from '../../action/sidenav-action';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

interface NavItem {
  name: string;
  iconSrc: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [AuthGoogleService],
  imports: [
    RouterOutlet,
    AsyncPipe,
    HeaderComponent,
    SharedModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<GoogleUserData | null> = this.store.select(GoogleUserState.getCurrentUser)
    .pipe(distinctUntilChanged());
  toggleSidenav$: Observable<boolean> = this.store.select(SidenavState.getToggleSidenav)
    .pipe(distinctUntilChanged());
  toggleSidenav: boolean = false;

  @ViewChild('drawer') drawer!: MatDrawer;

  navItems: NavItem[] = [
    { name: 'Novo Registro', iconSrc: 'home', route: '/dashboard/home' },
    { name: 'Relatório', iconSrc: 'person', route: '/dashboard/profile' },
    { name: 'Configurações', iconSrc: 'settings', route: '/dashboard/settings' },
    { name: 'Ajuda', iconSrc: 'help', route: '/dashboard/help' }
  ]

  constructor(
    private store: Store,
    private authGoogleService: AuthGoogleService
  ) {
    this.handleToggleSidenav();
  }

  ngOnInit(): void {
    this.store.dispatch(new SetToggleSidenav(false));
  }

  handleToggleSidenav(): void {
    this.toggleSidenav$.subscribe((toggleSidenav) => {
      this.toggleSidenav = toggleSidenav;
      if (this.drawer) {
        toggleSidenav ? this.drawer.open() : this.drawer.close();
      }
    });
  }

  onToggleSidenav() {
    this.store.dispatch(new SetToggleSidenav(!this.toggleSidenav));
  }

}
