import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="flex items-center gap-4">
        <a routerLink="/events" class="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors text-decoration-none">
          <svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </a>
      </div>

      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-50">Create New Event</h1>
        <p class="text-gray-500 mt-1 dark:text-gray-400">Schedule a service, meeting, or event.</p>
      </div>

      <div class="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 dark:bg-gray-900 dark:border-gray-800">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-5">
          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Event Name</label>
            <input 
              formControlName="name" 
              class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700" 
              placeholder="e.g. Sunday Service" 
            />
            @if (isError('name')) {
              <p class="text-xs text-red-600 font-medium">Event name is required (min 3 chars)</p>
            }
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Date</label>
              <input 
                formControlName="date" 
                type="date" 
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700" 
              />
              @if (isError('date')) {
                <p class="text-xs text-red-600 font-medium">Date is required</p>
              }
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Time</label>
              <input 
                formControlName="time" 
                type="time" 
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700" 
              />
              @if (isError('time')) {
                <p class="text-xs text-red-600 font-medium">Time is required</p>
              }
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Location</label>
            <input 
              formControlName="location" 
              class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700" 
              placeholder="e.g. Main Sanctuary" 
            />
            @if (isError('location')) {
              <p class="text-xs text-red-600 font-medium">Location is required (min 3 chars)</p>
            }
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Type</label>
            <select 
              formControlName="type" 
              class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="service">Service</option>
              <option value="meeting">Meeting</option>
              <option value="social">Social</option>
              <option value="outreach">Outreach</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
            <textarea 
              formControlName="description" 
              rows="3"
              class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700" 
              placeholder="e.g. Weekly service"
            ></textarea>
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <a 
              routerLink="/events" 
              class="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer text-decoration-none shadow-sm transition-all"
            >
              Cancel
            </a>
            <button 
              type="submit" 
              [disabled]="form.invalid || submitting()"
              class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer border-none shadow-sm transition-all"
            >
              {{ submitting() ? 'Creating...' : 'Create Event' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class EventCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private eventService = inject(EventService);

  form!: FormGroup;
  submitting = signal(false);

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(3)]],
      type: ['service', Validators.required],
      description: ['']
    });
  }

  isError(fieldName: string): boolean {
    const ctrl = this.form.get(fieldName);
    return !!(ctrl && ctrl.touched && ctrl.invalid);
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.submitting.set(true);
    const eventData: Event = this.form.value;

    this.eventService.createEvent(eventData).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/events']);
      },
      error: (err) => {
        console.error('Failed to create event:', err);
        alert('Failed to save event. Check console.');
        this.submitting.set(false);
      }
    });
  }
}
