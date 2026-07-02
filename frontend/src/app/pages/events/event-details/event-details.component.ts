import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="flex items-center gap-4">
        <a routerLink="/events" class="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors text-decoration-none">
          <svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </a>
      </div>

      @if (loading()) {
        <div class="p-12 text-center text-gray-500 font-medium">Loading event details...</div>
      } @else if (error() || !event()) {
        <div class="p-12 text-center text-red-500 font-medium">Event not found</div>
      } @else {
        <div class="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 dark:bg-gray-900 dark:border-gray-800">
          <div class="flex justify-between items-start">
            <div>
              <span [class]="'px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ' + 
                (event()?.type === 'service' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400' :
                 event()?.type === 'meeting' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400' :
                 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300')">
                {{ event()?.type }}
              </span>
              <h1 class="mt-2.5 text-3xl font-extrabold text-gray-900 dark:text-gray-50">{{ event()?.name }}</h1>
              <p class="mt-1.5 text-gray-500 dark:text-gray-400">{{ event()?.description || 'No description provided.' }}</p>
            </div>
            <div [class]="'px-3 py-1 rounded-full text-sm font-semibold ' + 
              (event()?.status === 'scheduled' ? 'bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400')">
              {{ event()?.status?.toUpperCase() }}
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-100 dark:border-gray-850">
            <div class="flex items-center gap-3 text-gray-750 dark:text-gray-350">
              <div class="p-2 bg-indigo-50 text-indigo-600 rounded-xl dark:bg-indigo-950/50 dark:text-indigo-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div class="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Date</div>
                <div class="font-semibold text-sm">{{ event()?.date }}</div>
              </div>
            </div>
            <div class="flex items-center gap-3 text-gray-750 dark:text-gray-350">
              <div class="p-2 bg-indigo-50 text-indigo-600 rounded-xl dark:bg-indigo-950/50 dark:text-indigo-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div class="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Time</div>
                <div class="font-semibold text-sm">{{ event()?.time }}</div>
              </div>
            </div>
            <div class="flex items-center gap-3 text-gray-750 dark:text-gray-350">
              <div class="p-2 bg-indigo-50 text-indigo-600 rounded-xl dark:bg-indigo-950/50 dark:text-indigo-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div class="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Location</div>
                <div class="font-semibold text-sm">{{ event()?.location }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-100 rounded-2xl p-6 dark:bg-gray-900 dark:border-gray-800">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-bold text-gray-900 dark:text-gray-50 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Attendance
            </h2>
            <button class="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer shadow-sm border-none bg-transparent">Check-in Members</button>
          </div>
          
          <div class="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-400">
            No attendance records yet.
            <br />
            <span class="text-xs">Attendance feature coming soon.</span>
          </div>
        </div>
      }
    </div>
  `
})
export class EventDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);

  event = signal<Event | null>(null);
  loading = signal(true);
  error = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEvent(id).subscribe({
        next: (res) => {
          this.event.set(res);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error fetching event details:', err);
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
