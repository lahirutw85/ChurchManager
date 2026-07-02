import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { MembersListComponent } from './pages/members/members-list/members-list.component';
import { MemberCreateComponent } from './pages/members/member-create/member-create.component';
import { MemberDetailsComponent } from './pages/members/member-details/member-details.component';
import { EventsListComponent } from './pages/events/events-list/events-list.component';
import { EventCreateComponent } from './pages/events/event-create/event-create.component';
import { EventDetailsComponent } from './pages/events/event-details/event-details.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="bg-white p-8 border border-gray-100 rounded-2xl shadow-sm text-center py-16 dark:bg-gray-900 dark:border-gray-800">
      <h2 class="text-xl font-bold mb-2">Feature Under Construction</h2>
      <p class="text-gray-500 dark:text-gray-400">The page you are looking for is coming soon.</p>
    </div>
  `
})
export class PlaceholderComponent {}

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'members', component: MembersListComponent },
      { path: 'members/new', component: MemberCreateComponent },
      { path: 'members/:id', component: MemberDetailsComponent },
      { path: 'events', component: EventsListComponent },
      { path: 'events/new', component: EventCreateComponent },
      { path: 'events/:id', component: EventDetailsComponent },
      { path: 'households', component: PlaceholderComponent },
      { path: 'groups', component: PlaceholderComponent },
      { path: 'ministries', component: PlaceholderComponent },
      { path: 'attendance', component: PlaceholderComponent },
      { path: 'reports', component: PlaceholderComponent },
      { path: 'settings', component: PlaceholderComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'dashboard' }
];
