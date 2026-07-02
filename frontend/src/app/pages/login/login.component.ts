import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <div class="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-2xl shadow-lg text-center space-y-6">
        <div class="space-y-2">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-gray-50">Login</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Access your church roster and dashboard.</p>
        </div>
        <button 
          (click)="signIn()"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border-none">
          Sign In
        </button>
      </div>
    </div>
  `
})
export class LoginComponent {
  private router = inject(Router);

  signIn() {
    this.router.navigate(['/dashboard']);
  }
}
