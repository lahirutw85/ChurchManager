import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-6 max-w-7xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-50 flex items-center gap-2">
            <svg class="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Members
          </h1>
          <p class="text-gray-500 mt-1 dark:text-gray-400">Manage and view your church members roster.</p>
        </div>
        <a routerLink="/members/new" class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition-all cursor-pointer border-none text-decoration-none">
          <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Member
        </a>
      </div>

      @if (loading()) {
        <div class="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 space-y-4">
          <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-full"></div>
          <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-full"></div>
          <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse w-full"></div>
        </div>
      } @else if (error()) {
        <div class="p-8 text-center bg-red-50 text-red-600 rounded-2xl border border-red-200 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400 font-medium">
          Error loading members. Please try again.
        </div>
      } @else {
        <div class="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden dark:bg-gray-900 dark:border-gray-800">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm border-collapse">
              <thead class="bg-gray-50/75 border-b border-gray-100 dark:bg-gray-800/50 dark:border-gray-800">
                <tr>
                  <th class="p-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Member</th>
                  <th class="p-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Contact</th>
                  <th class="p-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Ministry</th>
                  <th class="p-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Status</th>
                  <th class="p-4 text-right"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
                @if (members().length === 0) {
                  <tr>
                    <td colSpan="5" class="p-12 text-center text-gray-500 dark:text-gray-400 font-medium">No members found.</td>
                  </tr>
                } @else {
                  @for (member of members(); track member.id) {
                    <tr class="hover:bg-gray-50/50 transition-colors group dark:hover:bg-gray-800/30">
                      <td class="p-4">
                        <a [routerLink]="['/members', member.id]" class="block text-decoration-none">
                          <div class="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors dark:text-gray-100 dark:group-hover:text-indigo-400">
                            {{ member.firstName }} {{ member.lastName }}
                          </div>
                          @if (member.memberNo) {
                            <div class="text-xs text-gray-400 dark:text-gray-500">{{ member.memberNo }}</div>
                          }
                        </a>
                      </td>
                      <td class="p-4 text-gray-600 dark:text-gray-400">
                        <div class="flex flex-col">
                          <span>{{ member.email || '-' }}</span>
                          <span class="text-xs text-gray-400 dark:text-gray-500">{{ member.phone || '-' }}</span>
                        </div>
                      </td>
                      <td class="p-4">
                        @if (member.ministry) {
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                            {{ member.ministry }}
                          </span>
                        } @else {
                          <span class="text-gray-400 dark:text-gray-500">-</span>
                        }
                      </td>
                      <td class="p-4">
                        <span 
                          [class]="'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ' + 
                          (member.status === 'active' ? 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400')">
                          {{ member.status }}
                        </span>
                      </td>
                      <td class="p-4 text-right">
                        <a [routerLink]="['/members', member.id]" class="inline-flex items-center text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1.5 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all duration-200 text-decoration-none">
                          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  }
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `
})
export class MembersListComponent implements OnInit {
  private memberService = inject(MemberService);

  members = signal<Member[]>([]);
  loading = signal(true);
  error = signal(false);

  ngOnInit() {
    this.memberService.getMembers().subscribe({
      next: (res) => {
        this.members.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching members:', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}
