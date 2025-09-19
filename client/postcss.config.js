
export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  grade: string;
  country: string;
  applicationStatus: 'Exploring' | 'Shortlisting' | 'Applying' | 'Submitted';
  lastActive: string;
  registrationDate: string;
  interactions: Interaction[];
  communications: Communication[];
  notes: Note[];
  progress: number;
}

export interface Interaction {
  id: string;
  type: 'login' | 'ai_question' | 'document_upload' | 'profile_update';
  description: string;
  timestamp: string;
  details?: any;
}

export interface Communication {
  id: string;
  type: 'email' | 'sms' | 'call';
  subject?: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'opened' | 'replied';
}

export interface Note {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Stats {
  totalStudents: number;
  activeStudents: number;
  inEssayStage: number;
  needsFollowUp: number;
}