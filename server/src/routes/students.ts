// server/src/routes/students.ts
import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Student, Note, Communication } from '../types';
import { generateStudentAnalysis } from '../services/aiService';

const router = Router();

// Mock database
let students: Student[] = [
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
        type: 'ai_question',
        description: 'Asked about SAT preparation strategies',
        timestamp: '2024-09-17T10:25:00Z'
      }
    ],
    communications: [],
    notes: []
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
  }
];

// GET all students
router.get('/', (req: Request, res: Response) => {
  res.json(students);
});

// GET single student
router.get('/:id', (req: Request, res: Response) => {
  const student = students.find(s => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  res.json(student);
});

// POST add note to student
router.post('/:id/notes', (req: Request, res: Response) => {
  const { content, author, priority } = req.body;
  
  if (!content || !author) {
    return res.status(400).json({ error: 'Content and author are required' });
  }

  const student = students.find(s => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const newNote: Note = {
    id: uuidv4(),
    content,
    author,
    priority: priority || 'medium',
    timestamp: new Date().toISOString()
  };

  student.notes.push(newNote);
  res.status(201).json(newNote);
});

// POST send follow-up email
router.post('/:id/follow-up', (req: Request, res: Response) => {
  const student = students.find(s => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const newCommunication: Communication = {
    id: uuidv4(),
    type: 'email',
    subject: 'Follow-up on your application progress',
    content: 'Follow-up email regarding application status and next steps',
    timestamp: new Date().toISOString(),
    status: 'sent'
  };

  student.communications.push(newCommunication);
  res.status(201).json(newCommunication);
});

// PUT update student
router.put('/:id', (req: Request, res: Response) => {
  const studentIndex = students.findIndex(s => s.id === req.params.id);
  if (studentIndex === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  students[studentIndex] = { ...students[studentIndex], ...req.body };
  res.json(students[studentIndex]);
});

// GET AI analysis for student
router.get('/:id/analysis', async (req: Request, res: Response) => {
  const student = students.find(s => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  try {
    const analysis = await generateStudentAnalysis(student);
    res.json(analysis);
  } catch (error) {
    console.error('AI analysis error:', error);
    res.status(500).json({ error: 'Failed to generate AI analysis' });
  }
});

export default router;