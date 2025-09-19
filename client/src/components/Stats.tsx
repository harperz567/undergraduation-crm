// components/Stats.tsx
import React from 'react';
import { Users, TrendingUp, Clock, BookOpen } from 'lucide-react';
import { Student } from '../types';

interface StatsProps {
  students: Student[];
}

const Stats: React.FC<StatsProps> = ({ students }) => {
  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.lastActive.includes('hour')).length,
    inEssayStage: students.filter(s => s.applicationStatus === 'Applying').length,
    needsFollowUp: students.filter(s => s.lastActive.includes('day')).length
  };

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Active Students',
      value: stats.activeStudents,
      icon: TrendingUp,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'In Essay Stage',
      value: stats.inEssayStage,
      icon: BookOpen,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      title: 'Needs Follow-up',
      value: stats.needsFollowUp,
      icon: Clock,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                <IconComponent className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;