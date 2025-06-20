import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Header from './assets/Components/Header';
import EventList from './assets/components/EventList';
import AddEvent from './assets/Components/AddEvent';
import EventDetail from './assets/Components/EventDetail';
import './App.css';

function App() {
  const LOCAL_STORAGE_KEY = "eventManagerData";
  const [events, setEvents] = useState([]);
  const [notification, setNotification] = useState(null);

  // Cleanup expired events (runs on app load and every hour)
  const cleanupExpiredEvents = (eventsList) => {
    const now = new Date();
    return eventsList.filter(event => {
      const eventDate = new Date(event.date);
      const expiryDate = new Date(eventDate);
      expiryDate.setDate(eventDate.getDate() + 2); // 2 days after event
      return now <= expiryDate;
    });
  };

  // Load and clean data from localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (Array.isArray(parsedData)) {
          const cleanedEvents = cleanupExpiredEvents(parsedData);
          if (cleanedEvents.length !== parsedData.length) {
            // Only update if events were actually removed
            setEvents(cleanedEvents);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanedEvents));
          } else {
            setEvents(parsedData);
          }
        }
      }
    } catch (error) {
      console.error("Failed to load events:", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }

    // Set up hourly cleanup
    const interval = setInterval(() => {
      setEvents(prev => {
        const cleanedEvents = cleanupExpiredEvents(prev);
        if (cleanedEvents.length !== prev.length) {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanedEvents));
          return cleanedEvents;
        }
        return prev;
      });
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  // Save data to localStorage (unchanged)
  useEffect(() => {
    const saveData = () => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
      } catch (error) {
        console.error("Failed to save events:", error);
      }
    };

    const timer = setTimeout(saveData, 500);
    return () => clearTimeout(timer);
  }, [events]);

  // Rest of your original functions remain exactly the same
  const addEventHandler = (newEvent) => {
    setEvents(prev => [{
      id: uuid(),
      title: newEvent.title.trim(),
      date: newEvent.date,
      description: newEvent.description.trim(),
      location: newEvent.location || '',
      theme: newEvent.theme || 'general',
      coverImage: newEvent.coverImage || null,
      status: newEvent.status || 'draft',
      type: newEvent.type || 'workshop',
      createdAt: new Date().toISOString()
    }, ...prev]);
    showNotification('Event added successfully!', 'success');
  };

  const removeEventHandler = (id) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    showNotification('Event deleted successfully', 'success');
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <Router>
      <div className="app-container">
        {notification && (
          <div className={`notification notification-${notification.type}`}>
            {notification.message}
          </div>
        )}
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <EventList 
                events={events} 
                onRemoveEvent={removeEventHandler} 
              />
            } />
            <Route path="/add" element={
              <AddEvent onAddEvent={addEventHandler} />
            } />
            <Route path="/event/:id" element={
              <EventDetail events={events} />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;