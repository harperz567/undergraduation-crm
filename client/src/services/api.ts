// services/api.ts
import axios from 'axios';
import { Student, Note, Communication } from '../types';

export interface AIAnalysis {
  summary: string;
  insights: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
  engagementScore: number;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentApi = {
  // Get all students
  getStudents: async (): Promise<Student[]> => {
    const response = await api.get('/students');
    return response.data;
  },

  // Get single student
  getStudent: async (id: string): Promise<Student> => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  // Get AI analysis for student
  getStudentAnalysis: async (id: string): Promise<AIAnalysis> => {
    const response = await api.get(`/students/${id}/analysis`);
    return response.data;
  },

  // Add note to student
  addNote: async (studentId: string, note: Omit<Note, 'id' | 'timestamp'>): Promise<Note> => {
    const response = await api.post(`/students/${studentId}/notes`, note);
    return response.data;
  },

  // Send follow-up email
  sendFollowUp: async (studentId: string): Promise<Communication> => {
    const response = await api.post(`/students/${studentId}/follow-up`);
    return response.data;
  },

  // Update student
  updateStudent: async (id: string, updates: Partial<Student>): Promise<Student> => {
    const response = await api.put(`/students/${id}`, updates);
    return response.data;
  },
};

export default api;