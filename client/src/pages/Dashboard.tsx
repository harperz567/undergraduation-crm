// pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Student } from '../types';
import { studentApi } from '../services/api';
import Stats from '../components/Stats';
import Filters from '../components/Filters';
import StudentTable from '../components/StudentTable';
import StudentProfile from '../components/StudentProfile';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await studentApi.getStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to load students:', error);
      // Use mock data for demo
      setStudents(mockStudents);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.applicationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStudentUpdate = (updatedStudent: Student) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setSelectedStudent(updatedStudent);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (selectedStudent) {
    return (
      <StudentProfile
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
        onUpdate={handleStudentUpdate}
      />
    );
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">UnderGraduation CRM</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome back, {user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Stats students={students} />
        
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <StudentTable
          students={filteredStudents}
          onStudentClick={setSelectedStudent}
          onStudentUpdate={handleStudentUpdate}
        />
      </div>
    </div>
  );
};

// Mock data for demo
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '+1-555-0123',
    grade: '12th Grade',
    country: 'United States',
    applicationStatus: 'Applying',
    lastActive: '2 hours ago',
    registrationDate: '2024-08-15',
    progress: 75,
    interactions: [
      {
        id: '1',
        type: 'login',
        description: 'User logged in',
        timestamp: '2024-09-18T14:30:00Z'
      },
      {
        id: '2',
        type: 'ai_question',
        description: 'Asked about essay writing tips',
        timestamp: '2024-09-18T14:35:00Z'
      },
      {
        id: '3',
        type: 'document_upload',
        description: 'Uploaded personal statement draft',
        timestamp: '2024-09-18T15:00:00Z'
      }
    ],
    communications: [
      {
        id: '1',
        type: 'email',
        subject: 'Welcome to UnderGraduation.com',
        content: 'Welcome email sent to new user',
        timestamp: '2024-08-15T10:00:00Z',
        status: 'opened'
      }
    ],
    notes: [
      {
        id: '1',
        content: 'Highly motivated student, interested in computer science programs',
        author: 'John Doe',
        timestamp: '2024-09-10T09:00:00Z',
        priority: 'high'
      }
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+86-138-0013-8000',
    grade: '11th Grade',
    country: 'China',
    applicationStatus: 'Shortlisting',
    lastActive: '1 day ago',
    registrationDate: '2024-09-01',
    progress: 45,
    interactions: [
      {
        id: '1',
        type: 'login',
        description: 'User logged in',
        timestamp: '2024-09-17T10:20:00Z'
      },
      {
        id: '2',
        type: 'ai_question',
        description: 'Asked about SAT preparation strategies',
        timestamp: '2024-09-17T10:25:00Z'
      }
    ],
    communications: [],
    notes: [
      {
        id: '1',
        content: 'Needs help with standardized test preparation',
        author: 'Jane Smith',
        timestamp: '2024-09-05T14:00:00Z',
        priority: 'medium'
      }
    ]
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    phone: '+44-20-7946-0958',
    grade: '12th Grade',
    country: 'United Kingdom',
    applicationStatus: 'Submitted',
    lastActive: '3 days ago',
    registrationDate: '2024-07-20',
    progress: 100,
    interactions: [
      {
        id: '1',
        type: 'document_upload',
        description: 'Submitted final application documents',
        timestamp: '2024-09-15T16:00:00Z'
      }
    ],
    communications: [
      {
        id: '1',
        type: 'email',
        subject: 'Application Submitted Successfully',
        content: 'Confirmation of successful application submission',
        timestamp: '2024-09-15T16:30:00Z',
        status: 'opened'
      }
    ],
    notes: []
  },
  {
    id: '4',
    name: 'Raj Patel',
    email: 'raj.patel@email.com',
    phone: '+91-98765-43210',
    grade: '12th Grade',
    country: 'India',
    applicationStatus: 'Exploring',
    lastActive: '5 days ago',
    registrationDate: '2024-09-05',
    progress: 20,
    interactions: [
      {
        id: '1',
        type: 'login',
        description: 'First login',
        timestamp: '2024-09-13T08:15:00Z'
      },
      {
        id: '2',
        type: 'ai_question',
        description: 'Asked about engineering programs in Canada',
        timestamp: '2024-09-13T08:30:00Z'
      }
    ],
    communications: [
      {
        id: '1',
        type: 'email',
        subject: 'Getting Started with UnderGraduation.com',
        content: 'Welcome email with platform overview',
        timestamp: '2024-09-05T12:00:00Z',
        status: 'delivered'
      }
    ],
    notes: []
  },
  {
    id: '5',
    name: 'Emma Thompson',
    email: 'emma.thompson@email.com',
    phone: '+1-555-0199',
    grade: '11th Grade',
    country: 'Canada',
    applicationStatus: 'Applying',
    lastActive: '4 hours ago',
    registrationDate: '2024-08-20',
    progress: 60,
    interactions: [
      {
        id: '1',
        type: 'ai_question',
        description: 'Asked about scholarship opportunities',
        timestamp: '2024-09-18T10:15:00Z'
      },
      {
        id: '2',
        type: 'document_upload',
        description: 'Uploaded transcript',
        timestamp: '2024-09-18T11:30:00Z'
      }
    ],
    communications: [
      {
        id: '1',
        type: 'email',
        subject: 'Scholarship Information Request',
        content: 'Follow-up email with scholarship resources',
        timestamp: '2024-09-16T09:00:00Z',
        status: 'opened'
      }
    ],
    notes: [
      {
        id: '1',
        content: 'Strong academic performance, interested in STEM programs',
        author: 'Sarah Wilson',
        timestamp: '2024-09-12T16:00:00Z',
        priority: 'high'
      }
    ]
  }
];

export default Dashboard;