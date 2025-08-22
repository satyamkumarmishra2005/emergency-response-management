# Emergency Response Management System - Frontend

A modern, responsive React frontend for the Emergency Response Management Service, built with Material-UI and designed for emergency personnel to efficiently manage alerts, responders, and system users.

## 🚨 Features

### Core Functionality
- **Real-time Dashboard** - Overview of system status, active alerts, and performance metrics
- **Emergency Alert Management** - Create, view, edit, and manage emergency alerts
- **Responder Management** - Manage emergency response teams and their assignments
- **User Management** - Comprehensive user administration with role-based access control
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### Key Components
- **Dashboard** - Statistics cards, charts, recent alerts, and system status
- **Alerts** - Data grid with filtering, sorting, and detailed view/edit dialogs
- **Responders** - Team management with specializations and performance tracking
- **Users** - User administration with permissions and security settings
- **Forms** - Multi-step forms with validation for creating alerts, responders, and users

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks and functional components
- **Material-UI (MUI) 5** - Professional UI components and theming
- **React Router 6** - Client-side routing and navigation
- **React Hook Form** - Form handling with validation
- **Recharts** - Data visualization and charts
- **Axios** - HTTP client for API communication
- **React Hot Toast** - User notifications and feedback

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js          # Main navigation header
│   │   └── Sidebar.js         # Navigation sidebar
│   ├── pages/
│   │   ├── Dashboard.js       # Main dashboard view
│   │   ├── Alerts.js          # Emergency alerts management
│   │   ├── AlertForm.js       # Create/edit alert form
│   │   ├── Responders.js      # Responder management
│   │   ├── ResponderForm.js   # Add/edit responder form
│   │   ├── Users.js           # User management
│   │   └── UserForm.js        # Add/edit user form
│   ├── App.js                 # Main application component
│   └── index.js               # Application entry point
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Backend services running (Alert Service, User Service, Responder Service)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EmergencyResponseManagementService/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build
```

## 🔧 Configuration

### Backend Integration
The frontend is configured to connect to your backend services. Update the proxy configuration in `package.json` if needed:

```json
{
  "proxy": "http://localhost:8080"
}
```

### Environment Variables
Create a `.env` file in the frontend directory for environment-specific configuration:

```env
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_ALERT_SERVICE_URL=http://localhost:8081
REACT_APP_USER_SERVICE_URL=http://localhost:8082
REACT_APP_RESPONDER_SERVICE_URL=http://localhost:8083
```

## 📱 Usage

### Navigation
- **Dashboard** - System overview and key metrics
- **Emergency Alerts** - View and manage all emergency alerts
- **Responders** - Manage emergency response teams
- **Users** - System user administration

### Creating Emergency Alerts
1. Navigate to Alerts → New Alert
2. Fill in the multi-step form:
   - Step 1: Alert type and severity
   - Step 2: Location and description
   - Step 3: Review and submit

### Managing Responders
1. Navigate to Responders
2. Use the data grid to view all teams
3. Click "Add Responder" to create new teams
4. Use action buttons to view, edit, or delete responders

### User Administration
1. Navigate to Users
2. Manage system users with role-based permissions
3. Configure security settings like two-factor authentication

## 🎨 UI/UX Features

### Design System
- **Color Scheme** - Emergency-appropriate colors (red primary, blue secondary)
- **Typography** - Clear, readable fonts optimized for emergency situations
- **Icons** - Intuitive icons for different emergency types and actions
- **Responsive Layout** - Adapts to different screen sizes and devices

### Accessibility
- **Keyboard Navigation** - Full keyboard support for all interactions
- **Screen Reader Support** - Proper ARIA labels and semantic HTML
- **High Contrast** - Clear visual hierarchy and contrast ratios
- **Mobile Optimized** - Touch-friendly interface for field use

## 🔌 API Integration

### Current Endpoints
The frontend is designed to integrate with your existing backend services:

- **Alert Service** (`/alerts`) - Emergency alert CRUD operations
- **User Service** (`/api/users`) - User management and authentication
- **Responder Service** (`/responder/api`) - Responder management

### Mock Data
Currently uses mock data for demonstration. Replace mock API calls with actual service integration:

```javascript
// Example: Replace mock data with real API call
const fetchAlerts = async () => {
  try {
    const response = await axios.get('/alerts');
    setAlerts(response.data);
  } catch (error) {
    console.error('Error fetching alerts:', error);
  }
};
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📦 Deployment

### Build and Deploy
```bash
# Build the application
npm run build

# The build folder contains production-ready files
# Deploy the contents of the build folder to your web server
```

### Docker Deployment
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the backend service documentation

## 🔮 Future Enhancements

- **Real-time Updates** - WebSocket integration for live alert updates
- **Mobile App** - React Native version for field responders
- **Advanced Analytics** - Enhanced reporting and performance metrics
- **Integration** - Third-party emergency service integrations
- **Offline Support** - Service worker for offline functionality

---

**Emergency Response Management System** - Empowering emergency personnel with modern, efficient tools for crisis management.

