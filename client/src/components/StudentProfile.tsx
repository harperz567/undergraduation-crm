// components/StudentProfile.tsx
import React, { useState } from 'react';
import { Users, BookOpen, Plus, TrendingUp } from 'lucide-react';
import { Student, Note } from '../types';
import { studentApi } from '../services/api';
import AIAnalysisComponent from './AIAnalysis';

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
  onUpdate: (student: Student) => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({
  student,
  onBack,
  onUpdate
}) => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Exploring': return 'bg-gray-100 text-gray-800';
      case 'Shortlisting': return 'bg-blue-100 text-blue-800';
      case 'Applying': return 'bg-yellow-100 text-yellow-800';
      case 'Submitted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      const note = await studentApi.addNote(student.id, {
        content: newNote.trim(),
        author: 'Current User',
        priority: 'medium'
      });

      const updatedStudent = {
        ...student,
        notes: [...student.notes, note]
      };

      onUpdate(updatedStudent);
      setNewNote('');
      setShowAddNote(false);
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  const handleSendFollowUp = async () => {
    try {
      const communication = await studentApi.sendFollowUp(student.id);
      const updatedStudent = {
        ...student,
        communications: [...student.communications, communication]
      };
      onUpdate(updatedStudent);
    } catch (error) {
      console.error('Failed to send follow-up:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={onBack}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Back to Students
            </button>
            <h1 className="text-xl font-semibold text-gray-900">{student.name}</h1>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(student.applicationStatus)}`}>
                {student.applicationStatus}
              </span>
              <button
                onClick={handleSendFollowUp}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Send Follow-up Email
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* New layout: basic info at top + two-column layout below */}
        <div className="space-y-8">
          {/* Student Basic Info - full width at top */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900 mt-1">{student.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900 mt-1">{student.phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Grade</label>
                <p className="text-gray-900 mt-1">{student.grade}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Country</label>
                <p className="text-gray-900 mt-1">{student.country}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Registration Date</label>
                <p className="text-gray-900 mt-1">{new Date(student.registrationDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Active</label>
                <p className="text-gray-900 mt-1">{student.lastActive}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 max-w-md">
              <label className="text-sm font-medium text-gray-500">Application Progress</label>
              <div className="mt-2">
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{student.progress}% Complete</p>
              </div>
            </div>
          </div>

          {/* Two-column layout below */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left column: interactions, communications, and internal notes */}
            <div className="space-y-6">
              {/* Interaction Timeline */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Interactions</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {student.interactions.length > 0 ? (
                    student.interactions.map(interaction => (
                      <div key={interaction.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          {interaction.type === 'login' && <Users className="h-5 w-5 text-green-500" />}
                          {interaction.type === 'ai_question' && <BookOpen className="h-5 w-5 text-blue-500" />}
                          {interaction.type === 'document_upload' && <Plus className="h-5 w-5 text-purple-500" />}
                          {interaction.type === 'profile_update' && <TrendingUp className="h-5 w-5 text-orange-500" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{interaction.description}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(interaction.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No interactions recorded yet</p>
                  )}
                </div>
              </div>

              {/* Communication Log */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication History</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {student.communications.length > 0 ? (
                    student.communications.map(comm => (
                      <div key={comm.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{comm.type.toUpperCase()}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              comm.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                              comm.status === 'delivered' ? 'bg-yellow-100 text-yellow-800' :
                              comm.status === 'opened' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {comm.status}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(comm.timestamp).toLocaleString()}
                          </span>
                        </div>
                        {comm.subject && (
                          <p className="text-sm font-medium text-gray-900 mb-1">{comm.subject}</p>
                        )}
                        <p className="text-sm text-gray-600">{comm.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No communications recorded yet</p>
                  )}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Internal Notes</h3>
                  <button
                    onClick={() => setShowAddNote(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Add Note
                  </button>
                </div>

                {showAddNote && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add your note here..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                    />
                    <div className="flex justify-end space-x-2 mt-3">
                      <button
                        onClick={() => setShowAddNote(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddNote}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {student.notes.length > 0 ? (
                    student.notes.map(note => (
                      <div key={note.id} className={`p-4 border-l-4 rounded-lg ${getPriorityColor(note.priority)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{note.author}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              note.priority === 'high' ? 'bg-red-100 text-red-800' :
                              note.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {note.priority}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(note.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700">{note.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No notes added yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right column: AI Analysis only */}
            <div className="space-y-6">
              {/* AI Analysis - placed on right side with more width */}
              <AIAnalysisComponent studentId={student.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;