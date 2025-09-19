// components/StudentTable.tsx
import React from 'react';
import { Users } from 'lucide-react';
import { Student } from '../types';
import { studentApi } from '../services/api';

interface StudentTableProps {
  students: Student[];
  onStudentClick: (student: Student) => void;
  onStudentUpdate: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onStudentClick,
  onStudentUpdate
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Exploring': return 'bg-gray-100 text-gray-800';
      case 'Shortlisting': return 'bg-blue-100 text-blue-800';
      case 'Applying': return 'bg-yellow-100 text-yellow-800';
      case 'Submitted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendEmail = async (e: React.MouseEvent, studentId: string) => {
    e.stopPropagation();
    try {
      const communication = await studentApi.sendFollowUp(studentId);
      // Update student with new communication
      const student = students.find(s => s.id === studentId);
      if (student) {
        const updatedStudent = {
          ...student,
          communications: [...student.communications, communication]
        };
        onStudentUpdate(updatedStudent);
      }
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map(student => (
              <tr 
                key={student.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onStudentClick(student)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">{student.email}</div>
                    <div className="text-sm text-gray-500">{student.grade}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.country}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(student.applicationStatus)}`}>
                    {student.applicationStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{student.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.lastActive}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={(e) => handleSendEmail(e, student.id)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Email
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStudentClick(student);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;