// server/src/services/aiService.ts
import OpenAI from 'openai';
// import { Student } from '../../../client/src/types';
import { Student } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AIAnalysis {
  summary: string;
  insights: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
  engagementScore: number; // 1-10
}

export const generateStudentAnalysis = async (student: Student): Promise<AIAnalysis> => {
  try {
    // Prepare student data for analysis
    const studentData = {
      name: student.name,
      grade: student.grade,
      country: student.country,
      applicationStatus: student.applicationStatus,
      progress: student.progress,
      lastActive: student.lastActive,
      totalInteractions: student.interactions.length,
      totalCommunications: student.communications.length,
      totalNotes: student.notes.length,
      interactions: student.interactions.map(i => ({
        type: i.type,
        description: i.description,
        timestamp: i.timestamp
      })),
      communications: student.communications.map(c => ({
        type: c.type,
        status: c.status,
        timestamp: c.timestamp
      })),
      notes: student.notes.map(n => ({
        content: n.content,
        priority: n.priority,
        timestamp: n.timestamp
      }))
    };

    const prompt = `
You are an AI analyst for an educational CRM system. Analyze the following student data and provide insights for admissions counselors.

Student Data:
${JSON.stringify(studentData, null, 2)}

Please provide a comprehensive analysis in the following JSON format:
{
  "summary": "A 2-3 sentence overview of the student's current status and trajectory",
  "insights": [
    "Key behavioral patterns or trends you observe",
    "Notable engagement levels or changes",
    "Academic progression indicators"
  ],
  "recommendations": [
    "Specific actions counselors should take",
    "Areas that need attention or support",
    "Opportunities to enhance student experience"
  ],
  "riskLevel": "low|medium|high - based on engagement and progress indicators",
  "engagementScore": "number from 1-10 based on activity, responsiveness, and progress"
}

Focus on:
- Application progress and engagement patterns
- Communication responsiveness 
- Areas where the student might need support
- Opportunities for personalized outreach
- Risk factors that might impact success

Be concise, actionable, and professional. Use data-driven insights.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert educational counselor and data analyst. Provide actionable insights for student success.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3, // Lower temperature for more consistent, factual responses
      max_tokens: 800
    });

    const aiResponse = response.choices[0]?.message?.content;
    if (!aiResponse) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const analysis = JSON.parse(aiResponse);
    
    // Validate the response structure
    const validatedAnalysis: AIAnalysis = {
      summary: analysis.summary || 'Analysis not available',
      insights: Array.isArray(analysis.insights) ? analysis.insights : ['No insights available'],
      recommendations: Array.isArray(analysis.recommendations) ? analysis.recommendations : ['No recommendations available'],
      riskLevel: ['low', 'medium', 'high'].includes(analysis.riskLevel) ? analysis.riskLevel : 'medium',
      engagementScore: typeof analysis.engagementScore === 'number' ? 
        Math.max(1, Math.min(10, analysis.engagementScore)) : 5
    };

    return validatedAnalysis;

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback analysis based on student data patterns
    return generateFallbackAnalysis(student);
  }
};

// Fallback analysis when OpenAI is unavailable
const generateFallbackAnalysis = (student: Student): AIAnalysis => {
  const recentActivity = student.lastActive.includes('hour') || student.lastActive.includes('minute');
  const highProgress = student.progress > 75;
  const activeEngagement = student.interactions.length > 3;
  
  let riskLevel: 'low' | 'medium' | 'high' = 'medium';
  let engagementScore = 5;
  
  if (recentActivity && highProgress && activeEngagement) {
    riskLevel = 'low';
    engagementScore = 8;
  } else if (!recentActivity && student.progress < 30) {
    riskLevel = 'high';
    engagementScore = 3;
  }

  return {
    summary: `${student.name} is currently in ${student.applicationStatus} status with ${student.progress}% progress. ${recentActivity ? 'Recently active' : 'Needs follow-up'} student from ${student.country}.`,
    insights: [
      `Student has completed ${student.progress}% of application process`,
      `Last activity: ${student.lastActive}`,
      `Total interactions: ${student.interactions.length}`,
      activeEngagement ? 'Shows consistent engagement with platform' : 'Limited platform engagement observed'
    ],
    recommendations: [
      riskLevel === 'high' ? 'Immediate follow-up recommended due to low activity' : 'Continue regular check-ins',
      student.progress < 50 ? 'Provide additional guidance on application completion' : 'Support with final application steps',
      'Personalized outreach based on country-specific requirements'
    ],
    riskLevel,
    engagementScore
  };
};