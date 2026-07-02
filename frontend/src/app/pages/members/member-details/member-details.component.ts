import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-6 max-w-5xl mx-auto">
      <!-- Back Link -->
      <div class="flex items-center gap-4">
        <a routerLink="/members" class="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors text-decoration-none">
          <svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Members
        </a>
      </div>

      @if (loading()) {
        <div class="p-12 text-center text-gray-500 font-medium">Loading member details...</div>
      } @else if (error() || !member()) {
        <div class="p-12 text-center text-red-500 font-medium">Member not found</div>
      } @else {
        <!-- Profile Header Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 flex flex-col md:flex-row items-start md:items-center gap-6 dark:bg-gray-900 dark:border-gray-800">
          <div class="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
            <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-50">{{ member()?.firstName }} {{ member()?.lastName }}</h1>
            <div class="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {{ member()?.email || '-' }}
              </div>
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {{ member()?.phone || '-' }}
              </div>
              <div class="flex items-center">
                <span [class]="'inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold ' + 
                  (member()?.status === 'active' ? 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400')">
                  {{ member()?.status?.toUpperCase() }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex gap-2 w-full md:w-auto">
            <button class="flex-1 md:flex-none justify-center inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer shadow-sm border-none">Edit Profile</button>
            <button class="flex-1 md:flex-none justify-center inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 cursor-pointer shadow-sm border-none">Log Interaction</button>
          </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="border-b border-gray-200 dark:border-gray-800">
          <nav class="flex gap-6 -mb-px">
            @for (tab of tabs; track tab.id) {
              <button 
                (click)="activeTab.set(tab.id)"
                [class]="'pb-4 px-1 text-sm font-bold border-b-2 transition-all cursor-pointer bg-transparent border-none ' + 
                  (activeTab() === tab.id ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300')">
                {{ tab.name }}
              </button>
            }
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="mt-6">
          @if (activeTab() === 'overview') {
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Ministry Involvement -->
              <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 dark:bg-gray-900 dark:border-gray-800">
                <div class="flex items-center gap-2 mb-4">
                  <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 class="text-base font-bold text-gray-900 dark:text-gray-50">Ministry Involvement</h3>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  Currently serving in: <span class="font-bold text-gray-900 dark:text-gray-50">{{ member()?.ministry || 'None' }}</span>
                </p>
              </div>

              <!-- Key Dates -->
              <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 dark:bg-gray-900 dark:border-gray-800">
                <div class="flex items-center gap-2 mb-4">
                  <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 class="text-base font-bold text-gray-900 dark:text-gray-50">Key Dates</h3>
                </div>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between border-b border-gray-50 pb-2 dark:border-gray-800">
                    <span class="text-gray-500">Date of Birth</span>
                    <span class="font-medium">{{ member()?.dob || '-' }}</span>
                  </div>
                  <div class="flex justify-between border-b border-gray-50 pb-2 dark:border-gray-800">
                    <span class="text-gray-500">Baptism Status / Date</span>
                    <span class="font-medium">
                      {{ member()?.baptismStatus === 'Baptized' ? 'Baptized (' + (member()?.baptismDate || 'Date missing') + ')' : 'Not Baptized' }}
                    </span>
                  </div>
                  <div class="flex justify-between pb-1">
                    <span class="text-gray-500">Joined Date</span>
                    <span class="font-medium">{{ member()?.joinedDate || '-' }}</span>
                  </div>
                </div>
              </div>
            </div>
          }

          @if (activeTab() === 'family') {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 dark:bg-gray-900 dark:border-gray-800">
              <div class="flex items-center gap-2 mb-4">
                <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 class="text-base font-bold text-gray-900 dark:text-gray-50">Household</h3>
              </div>
              
              @if (member()?.householdName || member()?.spouseName) {
                <div class="space-y-3 text-sm">
                  @if (member()?.householdName) {
                    <div class="flex justify-between border-b border-gray-50 pb-2 dark:border-gray-800">
                      <span class="text-gray-500 font-semibold">Household Name</span>
                      <span class="font-medium text-gray-900 dark:text-gray-100">{{ member()?.householdName }}</span>
                    </div>
                  }
                  @if (member()?.spouseName) {
                    <div class="flex justify-between border-b border-gray-50 pb-2 dark:border-gray-800">
                      <span class="text-gray-500 font-semibold">Spouse Name</span>
                      <span class="font-medium text-gray-900 dark:text-gray-100">{{ member()?.spouseName }}</span>
                    </div>
                  }
                  @if (member()?.childrenCount !== undefined) {
                    <div class="flex justify-between pb-1">
                      <span class="text-gray-500 font-semibold">Children Count</span>
                      <span class="font-medium text-gray-900 dark:text-gray-100">{{ member()?.childrenCount }}</span>
                    </div>
                  }
                </div>
              } @else {
                <div class="text-center py-10 text-gray-450 dark:text-gray-500">
                  No family members linked yet.
                </div>
              }
            </div>
          }

          @if (activeTab() === 'attendance') {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 dark:bg-gray-900 dark:border-gray-800 text-center py-12">
              <p class="text-gray-550 dark:text-gray-400">Attendance data will appear here.</p>
            </div>
          }

          @if (activeTab() === 'giving') {
            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 dark:bg-gray-900 dark:border-gray-800 text-center py-12">
              <p class="text-gray-550 dark:text-gray-400">Giving history is private.</p>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class MemberDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private memberService = inject(MemberService);

  member = signal<Member | null>(null);
  loading = signal(true);
  error = signal(false);

  tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'family', name: 'Family' },
    { id: 'attendance', name: 'Attendance' },
    { id: 'giving', name: 'Giving' }
  ];

  activeTab = signal('overview');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.memberService.getMember(id).subscribe({
        next: (res) => {
          this.member.set(res);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error fetching member details:', err);
          this.error.set(true);
          this.loading.set(false);
        }
      });
    } else {
      this.error.set(true);
      this.loading.set(false);
    }
  }
}
