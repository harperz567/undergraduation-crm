# UnderGraduation.com CRM Dashboard

Internal CRM dashboard for managing student interactions and tracking application progress.

## Features

- **Student Directory**: Table view with search and filters
- **Individual Profiles**: Detailed student information with progress tracking
- **Interaction Timeline**: Track login activity, AI questions, document uploads
- **Communication Log**: Email and SMS communication history
- **Internal Notes**: Team collaboration with priority levels
- **Follow-up Tools**: Send automated follow-up emails
- **Analytics**: Summary statistics and filtering options

## Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: In-memory (can be extended to Firebase)
- **Icons**: Lucide React

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
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
echo "PORT=5000" > server/.env
echo "FRONTEND_URL=http://localhost:3000" >> server/.env
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
- Backend API: http://localhost:5000

## Project Structure

```
undergraduation-crm/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
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
│   │   ├── types/
│   │   │   └── index.ts    # Shared types
│   │   └── app.ts          # Express server
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get single student
- `POST /api/students/:id/notes` - Add note to student
- `POST /api/students/:id/follow-up` - Send follow-up email
- `PUT /api/students/:id` - Update student information

## Features Implementation

### Student Directory
- Searchable table with filtering by application status
- Quick stats overview (total, active, essay stage, needs follow-up)
- Progress bar visualization

### Student Profiles
- Complete student information display
- Interaction timeline with icons
- Communication history with status tracking
- Internal notes with priority levels
- Add notes functionality

### Communication Tools
- Mock email sending (logs to communications)
- Follow-up email templates
- Status tracking (sent, delivered, opened)

### Quick Filters
- Students not contacted in 7+ days
- High priority students
- Students in specific application stages

## Development Notes

- Mock data is used for demonstration
- Firebase integration ready (update services/api.ts)
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Component-based architecture for maintainability

## Future Enhancements

- Firebase/Firestore integration
- Real email sending via Customer.io
- User authentication
- Advanced filtering and sorting
- Export functionality
- Email templates customization