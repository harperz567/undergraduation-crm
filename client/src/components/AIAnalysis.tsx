// components/AIAnalysis.tsx
import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Loader } from 'lucide-react';
import { studentApi, AIAnalysis } from '../services/api';

interface AIAnalysisProps {
  studentId: string;
}

const AIAnalysisComponent: React.FC<AIAnalysisProps> = ({ studentId }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAnalysis = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const aiAnalysis = await studentApi.getStudentAnalysis(studentId);
      setAnalysis(aiAnalysis);
    } catch (err) {
      console.error('Failed to load AI analysis:', err);
      setError('Failed to generate AI analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalysis();
  }, [studentId]);

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'medium': return <TrendingUp className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Brain className="h-6 w-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <Loader className="h-8 w-8 animate-spin text-purple-600" />
          <span className="ml-2 text-gray-600">Analyzing student data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Brain className="h-6 w-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={loadAnalysis}
            className="mt-2 text-red-700 hover:text-red-900 text-sm font-medium"
          >
            Retry Analysis
          </button>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Brain className="h-6 w-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
        </div>
        <button
          onClick={loadAnalysis}
          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Executive Summary</h4>
        <p className="text-gray-900 bg-purple-50 p-4 rounded-lg border border-purple-100">
          {analysis.summary}
        </p>
      </div>

      {/* Risk Level & Engagement Score */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            {getRiskIcon(analysis.riskLevel)}
            <span className="ml-2 text-sm font-medium text-gray-700">Risk Level</span>
          </div>
          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getRiskLevelColor(analysis.riskLevel)}`}>
            {analysis.riskLevel.charAt(0).toUpperCase() + analysis.riskLevel.slice(1)}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="ml-2 text-sm font-medium text-gray-700">Engagement Score</span>
          </div>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">{analysis.engagementScore}</div>
            <div className="text-sm text-gray-500 ml-1">/10</div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Key Insights</h4>
        <div className="space-y-2">
          {analysis.insights.map((insight, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
              <p className="text-sm text-gray-700">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Recommendations</h4>
        <div className="space-y-2">
          {analysis.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
              <p className="text-sm text-gray-700">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Disclaimer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          AI-generated analysis based on student activity data. Use as guidance alongside professional judgment.
        </p>
      </div>
    </div>
  );
};

export default AIAnalysisComponent;