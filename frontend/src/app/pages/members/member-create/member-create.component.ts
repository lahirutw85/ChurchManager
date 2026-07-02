import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-member-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="space-y-6 max-w-5xl mx-auto pb-20">
      <!-- Header -->
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-50">Add Member</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Create a new member profile for your church.
          </p>
        </div>

        <div class="flex gap-3">
          <a
            routerLink="/members"
            class="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer text-decoration-none shadow-sm transition-all"
          >
            Cancel
          </a>
          <button
            (click)="onSubmit()"
            [disabled]="form.invalid || submitting()"
            class="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer border-none shadow-sm transition-all"
          >
            {{ submitting() ? "Saving..." : "Save Member" }}
          </button>
        </div>
      </div>

      <form [formGroup]="form" class="space-y-6">
        <!-- Personal Info -->
        <section class="rounded-2xl bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm">
          <div class="mb-5">
            <h2 class="text-lg font-bold text-gray-900 dark:text-gray-50">Personal Information</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Basic details for identification and contact.</p>
          </div>
          
          <div class="grid gap-5 md:grid-cols-3">
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Member No *</label>
              <input
                formControlName="memberNo"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder="e.g. M-00021"
              />
              @if (isError('memberNo')) {
                <p class="text-xs text-red-600 font-medium">Member No is required</p>
              }
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">First Name *</label>
              <input
                formControlName="firstName"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder="e.g. Lahiru"
              />
              @if (isError('firstName')) {
                <p class="text-xs text-red-600 font-medium">First name is required</p>
              }
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Last Name *</label>
              <input
                formControlName="lastName"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder="e.g. Perera"
              />
              @if (isError('lastName')) {
                <p class="text-xs text-red-600 font-medium">Last name is required</p>
              }
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Gender</label>
              <select formControlName="gender" class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Date of Birth</label>
              <input formControlName="dob" type="date" class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700" />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">NIC / Passport</label>
              <input
                formControlName="nicOrPassport"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder="Optional"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</label>
              <input
                formControlName="phone"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder="+971..."
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
              <input
                formControlName="email"
                type="email"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder="name@email.com"
              />
              @if (isError('email') || form.get('email')?.hasError('email')) {
                <p class="text-xs text-red-600 font-medium">Invalid email format</p>
              }
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Ministry</label>
              <input
                formControlName="ministry"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder="e.g. Worship Team"
              />
            </div>
          </div>
        </section>

        <!-- Address -->
        <section class="rounded-2xl bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm">
          <div class="mb-5">
            <h2 class="text-lg font-bold text-gray-900 dark:text-gray-50">Address</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Used for visitation and communication.</p>
          </div>
          
          <div class="grid gap-5 md:grid-cols-2">
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Address Line 1</label>
              <input formControlName="addressLine1" class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700" />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Address Line 2</label>
              <input formControlName="addressLine2" class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700" />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">City</label>
              <input formControlName="city" class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700" />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Country</label>
              <input formControlName="country" class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700" />
            </div>
          </div>
        </section>

        <!-- Family -->
        <section class="rounded-2xl bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm">
          <div class="mb-5">
            <h2 class="text-lg font-bold text-gray-900 dark:text-gray-50">Family</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Helps to group members into households.</p>
          </div>
          
          <div class="grid gap-5 md:grid-cols-3">
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Household Name</label>
              <input
                formControlName="householdName"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder="e.g. Perera Family"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Marital Status</label>
              <select formControlName="maritalStatus" class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700">
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Children Count</label>
              <input
                formControlName="childrenCount"
                type="number"
                min="0"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Spouse Name</label>
              <input
                formControlName="spouseName"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder="Optional"
              />
            </div>
          </div>
        </section>

        <!-- Church Info -->
        <section class="rounded-2xl bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm">
          <div class="mb-5">
            <h2 class="text-lg font-bold text-gray-900 dark:text-gray-50">Church Information</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Membership and spiritual milestones.</p>
          </div>
          
          <div class="grid gap-5 md:grid-cols-3">
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Member Status *</label>
              <select formControlName="memberStatus" class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700">
                <option value="Visitor">Visitor</option>
                <option value="Regular">Regular</option>
                <option value="Member">Member</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Joined Date</label>
              <input formControlName="joinedDate" type="date" class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700" />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Baptism Status</label>
              <select formControlName="baptismStatus" class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700">
                <option value="Not Baptized">Not Baptized</option>
                <option value="Baptized">Baptized</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Baptism Date</label>
              <input
                formControlName="baptismDate"
                type="date"
                [class]="'w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 ' + 
                  (isBaptised() ? 'border-gray-200' : 'bg-gray-100 border-gray-200 cursor-not-allowed dark:bg-gray-850')"
              />
              @if (!isBaptised()) {
                <p class="mt-1 text-xs text-gray-500">Enable by selecting “Baptized”.</p>
              }
              @if (isError('baptismDate')) {
                <p class="text-xs text-red-600 font-medium">Baptism date is required when Baptized is selected</p>
              }
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Previous Church</label>
              <input
                formControlName="previousChurch"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder="Optional"
              />
            </div>
          </div>
        </section>

        <!-- Emergency -->
        <section class="rounded-2xl bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm">
          <div class="mb-5">
            <h2 class="text-lg font-bold text-gray-900 dark:text-gray-50">Emergency Contact</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Used if anything happens during events.</p>
          </div>
          
          <div class="grid gap-5 md:grid-cols-3">
            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact Name</label>
              <input formControlName="emergencyName" class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700" />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Relationship</label>
              <input
                formControlName="emergencyRelationship"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder="e.g. Spouse / Brother / Parent"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact Phone</label>
              <input
                formControlName="emergencyPhone"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder="+971..."
              />
            </div>
          </div>
        </section>

        <!-- Notes -->
        <section class="rounded-2xl bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm">
          <div class="mb-5">
            <h2 class="text-lg font-bold text-gray-900 dark:text-gray-50">Notes</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Pastoral notes, follow-up, prayer needs (keep it private).</p>
          </div>
          
          <div class="space-y-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Notes</label>
            <textarea
              formControlName="notes"
              rows="4"
              class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700 min-h-[120px]"
              placeholder="Write notes here..."
            ></textarea>
          </div>
        </section>
      </form>
    </div>
  `
})
export class MemberCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private memberService = inject(MemberService);

  form!: FormGroup;
  submitting = signal(false);

  ngOnInit() {
    this.form = this.fb.group({
      memberNo: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [''],
      dob: [''],
      nicOrPassport: [''],
      phone: [''],
      email: ['', Validators.email],
      ministry: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      country: ['UAE'],
      householdName: [''],
      maritalStatus: [''],
      childrenCount: [0],
      spouseName: [''],
      memberStatus: ['Regular', Validators.required],
      joinedDate: [''],
      baptismStatus: ['Not Baptized'],
      baptismDate: [{ value: '', disabled: true }],
      emergencyName: [''],
      emergencyRelationship: [''],
      emergencyPhone: [''],
      notes: ['']
    });

    this.form.get('baptismStatus')?.valueChanges.subscribe(status => {
      const dateCtrl = this.form.get('baptismDate');
      if (status === 'Baptized') {
        dateCtrl?.enable();
        dateCtrl?.setValidators([Validators.required]);
      } else {
        dateCtrl?.disable();
        dateCtrl?.clearValidators();
        dateCtrl?.setValue('');
      }
      dateCtrl?.updateValueAndValidity();
    });
  }

  isBaptised(): boolean {
    return this.form.get('baptismStatus')?.value === 'Baptized';
  }

  isError(fieldName: string): boolean {
    const ctrl = this.form.get(fieldName);
    return !!(ctrl && ctrl.touched && ctrl.invalid);
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.submitting.set(true);
    const formRaw = this.form.getRawValue();
    
    // Map memberStatus to status ('active' | 'inactive')
    const status = formRaw.memberStatus === 'Inactive' ? 'inactive' : 'active';
    const memberData: Member = {
      ...formRaw,
      status
    };

    this.memberService.createMember(memberData).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/members']);
      },
      error: (err) => {
        console.error('Failed to create member:', err);
        alert('Failed to save member. Please check console.');
        this.submitting.set(false);
      }
    });
  }
}
