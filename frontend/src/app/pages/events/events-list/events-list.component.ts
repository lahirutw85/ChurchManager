import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-50">Events</h1>
        <a routerLink="/events/new" class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition-all cursor-pointer text-decoration-none border-none">
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Event
        </a>
      </div>

      @if (loading()) {
        <div class="p-12 text-center text-gray-500 font-medium">Loading events...</div>
      } @else {
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (event of events(); track event.id) {
            <a [routerLink]="['/events', event.id]" class="block text-decoration-none">
              <div class="bg-white border border-gray-100 hover:shadow-md hover:border-gray-250 transition-all duration-200 cursor-pointer rounded-2xl p-6 h-full dark:bg-gray-900 dark:border-gray-800 dark:hover:border-gray-700 flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-start mb-4">
                    <span 
                      [class]="'px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ' + 
                      (event.type === 'service' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400' :
                       event.type === 'meeting' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400' :
                       'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300')">
                      {{ event.type }}
                    </span>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">{{ event.name }}</h3>
                </div>

                <div class="space-y-2.5 text-sm text-gray-500 dark:text-gray-400">
                  <div class="flex items-center gap-2">
                    <svg class="w-4.5 h-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{{ event.date }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-4.5 h-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ event.time }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-4.5 h-4.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{{ event.location }}</span>
                  </div>
                </div>
              </div>
            </a>
          }
        </div>

        @if (events().length === 0) {
          <div class="text-center py-16 text-gray-500 bg-white border border-gray-100 rounded-2xl dark:bg-gray-900 dark:border-gray-800 dark:text-gray-400 font-medium">
            No events scheduled. Create one to get started.
          </div>
        }
      }
    </div>
  `
})
export class EventsListComponent implements OnInit {
  private eventService = inject(EventService);

  events = signal<Event[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.eventService.getEvents().subscribe({
      next: (res) => {
        this.events.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.loading.set(false);
      }
    });
  }
}
