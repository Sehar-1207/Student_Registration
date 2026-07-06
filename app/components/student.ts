export type Gender = 'Male' | 'Female' | 'Other';

export type Student = {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: Gender;
  course: string;
  status: 'pending' | 'completed';
}