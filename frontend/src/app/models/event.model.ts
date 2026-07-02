export interface Event {
  id?: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'service' | 'meeting' | 'social' | 'outreach' | 'other';
  status: 'scheduled' | 'cancelled' | 'completed';
  createdAt?: string;
}
