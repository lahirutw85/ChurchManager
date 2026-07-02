import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-50">Dashboard</h1>
        <p class="text-gray-500 mt-1 dark:text-gray-400">Welcome back, Pastor.</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid gap-6 md:grid-cols-3">
        <!-- Stat 1 -->
        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-200 dark:bg-gray-900 dark:border-gray-800">
          <div class="space-y-1">
            <span class="text-sm font-semibold text-gray-400 dark:text-gray-500">Total Members</span>
            <div class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{{ totalMembers() }}</div>
            <p class="text-xs text-green-500 mt-1 flex items-center gap-1 font-medium">
              <span>+20.1%</span> <span class="text-gray-400 font-normal">from last month</span>
            </p>
          </div>
          <div class="p-3 bg-blue-50 text-blue-600 rounded-2xl dark:bg-blue-950/50 dark:text-blue-400">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        <!-- Stat 2 -->
        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-200 dark:bg-gray-900 dark:border-gray-800">
          <div class="space-y-1">
            <span class="text-sm font-semibold text-gray-400 dark:text-gray-500">Weekly Attendance</span>
            <div class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">142</div>
            <p class="text-xs text-green-500 mt-1 flex items-center gap-1 font-medium">
              <span>+12.4%</span> <span class="text-gray-400 font-normal">from last week</span>
            </p>
          </div>
          <div class="p-3 bg-green-50 text-green-600 rounded-2xl dark:bg-green-950/50 dark:text-green-400">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <!-- Stat 3 -->
        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all duration-200 dark:bg-gray-900 dark:border-gray-800">
          <div class="space-y-1">
            <span class="text-sm font-semibold text-gray-400 dark:text-gray-500">Total Giving</span>
            <div class="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">$12,450</div>
            <p class="text-xs text-purple-500 mt-1 flex items-center gap-1 font-medium">
              <span>+8.2%</span> <span class="text-gray-400 font-normal">from last month</span>
            </p>
          </div>
          <div class="p-3 bg-purple-50 text-purple-600 rounded-2xl dark:bg-purple-950/50 dark:text-purple-400">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Main Layout Details -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <!-- Recent Activity -->
        <div class="col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-800">
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-900 dark:text-gray-50">Recent Activity</h2>
          </div>
          <div class="space-y-6">
            @for (act of activities; track act.id) {
              <div class="flex items-center">
                <div class="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center dark:bg-indigo-950/50">
                  <svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 9a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-4 space-y-0.5">
                  <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ act.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ act.desc }}</p>
                </div>
                <div class="ml-auto font-medium text-xs text-gray-400">{{ act.time }}</div>
              </div>
            }
          </div>
        </div>

        <!-- Upcoming Events -->
        <div class="col-span-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-800">
          <div class="mb-6">
            <h2 class="text-lg font-bold text-gray-900 dark:text-gray-50">Upcoming Events</h2>
          </div>
          
          <div class="space-y-5">
            @if (upcomingEvents().length === 0) {
              <p class="text-sm text-gray-500 text-center py-6">No upcoming events scheduled.</p>
            } @else {
              @for (event of upcomingEvents(); track event.id) {
                <a [routerLink]="['/events', event.id]" class="block group">
                  <div class="flex items-center justify-between hover:bg-gray-50 p-2.5 rounded-xl -mx-2.5 transition-all duration-200 dark:hover:bg-gray-800">
                    <div class="space-y-1">
                      <p class="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors dark:text-gray-100 dark:group-hover:text-indigo-400">{{ event.name }}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">{{ event.date }} • {{ event.time }}</p>
                    </div>
                    <span 
                      [class]="'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ' + 
                      (event.type === 'service' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300')">
                      {{ event.type }}
                    </span>
                  </div>
                </a>
              }
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private memberService = inject(MemberService);
  private eventService = inject(EventService);

  totalMembers = signal(0);
  upcomingEvents = signal<Event[]>([]);

  activities = [
    { id: 1, title: 'New donation received', desc: 'Someone gave $100.00', time: '1h ago' },
    { id: 2, title: 'Member added', desc: 'Lahiru Perera joined the roster', time: '2h ago' },
    { id: 3, title: 'Event scheduled', desc: 'Mid-week Prayer Meeting created', time: '3h ago' }
  ];

  ngOnInit() {
    forkJoin({
      members: this.memberService.getMembers(),
      events: this.eventService.getEvents()
    }).subscribe({
      next: (res) => {
        this.totalMembers.set(res.members.length);
        this.upcomingEvents.set(res.events.slice(0, 3));
      },
      error: (err) => {
        console.error('Error fetching dashboard statistics:', err);
      }
    });
  }
}
