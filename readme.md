# UnderGraduation.com CRM Dashboard
AI-powered CRM dashboard for managing student interactions and tracking application progress.

## 🎯 Key Features
- **Student Directory**: Table view with search and filters
- **Individual Profiles**: Detailed student information with progress tracking
- **🤖 AI Analysis**: Intelligent risk assessment and engagement scoring
- **Interaction Timeline**: Track login activity, AI questions, document uploads
- **Communication Log**: Email and SMS communication history
- **Internal Notes**: Team collaboration with priority levels
- **Follow-up Tools**: Send automated follow-up emails
- **Analytics**: Summary statistics and filtering options

## 🤖 AI-Powered Insights
The system provides intelligent student analysis using OpenAI API:
- **Risk Assessment**: Automatically categorizes students as low, medium, or high risk
- **Engagement Scoring**: 1-10 scale rating based on platform activity
- **Behavioral Insights**: AI-generated observations about student patterns
- **Action Recommendations**: Specific suggestions for counselor follow-up

## 🛠 Tech Stack
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **AI Integration**: OpenAI API for intelligent analysis
- **Database**: In-memory (can be extended to Firebase)
- **Icons**: Lucide React

## 🚀 Setup Instructions
### Prerequisites
- Node.js 16+ and npm
- OpenAI API key
- Git

### Installation
1. **Clone the repository**
```bash
git clone https://github.com/harperz567/undergraduation-crm.git
cd undergraduation-crm
```

2. **Install dependencies**
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. **Environment Setup**
```bash
# Create .env file in server directory
echo "PORT=5001" > server/.env
echo "FRONTEND_URL=http://localhost:3000" >> server/.env
echo "OPENAI_API_KEY=your_openai_api_key_here" >> server/.env
```

4. **Start Development Servers**
```bash
# Terminal 1: Start backend server
cd server
npm run dev

# Terminal 2: Start frontend client
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## 📁 Project Structure
```
undergraduation-crm/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── AIAnalysis.tsx     # AI analysis component
│   │   │   ├── Stats.tsx
│   │   │   ├── Filters.tsx
│   │   │   ├── StudentTable.tsx
│   │   │   └── StudentProfile.tsx
│   │   ├── pages/
│   │   │   └── Dashboard.tsx
│   │   ├── services/
│   │   │   └── api.ts      # API client
│   │   ├── types/
│   │   │   └── index.ts    # TypeScript types
│   │   └── App.tsx
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/
│   │   │   └── students.ts # API routes
│   │   ├── services/
│   │   │   └── aiService.ts # OpenAI integration
│   │   ├── types/
│   │   │   └── index.ts    # Shared types
│   │   └── app.ts          # Express server
│   └── package.json
└── README.md
```

## 🔗 API Endpoints
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get single student
- `GET /api/students/:id/analysis` - Get AI analysis for student
- `POST /api/students/:id/notes` - Add note to student
- `POST /api/students/:id/follow-up` - Send follow-up email
- `PUT /api/students/:id` - Update student information

## ✨ Features Implementation
### Student Directory
- Searchable table with filtering by application status
- Quick stats overview (total, active, essay stage, needs follow-up)
- Progress bar visualization

### AI-Powered Student Analysis
- Real-time risk assessment based on engagement patterns
- Intelligent recommendations for counselor actions
- Engagement scoring with visual indicators
- Executive summary of student behavior

### Student Profiles
- Complete student information display
- Interaction timeline with icons
- Communication history with status tracking
- Internal notes with priority levels
- AI analysis panel with insights

### Communication Tools
- Mock email sending (logs to communications)
- Follow-up email templates
- Status tracking (sent, delivered, opened)

### Quick Filters
- Students not contacted in 7+ days
- High priority students
- Students in specific application stages

## 🎥 Demo
[**Watch Live Demo**](https://www.loom.com/share/0f8e0b383cc949ef86c9d0697087aaaa?sid=e99f1a60-8f38-402a-b1de-d133e4c21367) - Complete walkthrough of all features including AI analysis

## 🔒 Environment Variables
```env
PORT=5001
FRONTEND_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key_here
```

## 📝 Development Notes
- Mock data is used for demonstration
- Firebase integration ready (update services/api.ts)
- OpenAI API integration for intelligent analysis
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Component-based architecture for maintainability

## 🚀 Future Enhancements
- Firebase/Firestore integration
- Real email sending via Customer.io
- User authentication
- Advanced AI analytics dashboard
- Export functionality
- Email templates customization
- Machine learning model training on historical data

---
⭐ **Built by Harper Zhang** - Showcasing full-stack development with AI integration
