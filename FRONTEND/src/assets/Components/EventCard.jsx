import { Link } from "react-router-dom";
import './EventCard.css';

const EventCard = ({ event, deleteEventHandler }) => {
  // Calculate if event is expiring soon (within 2 days after event date)
  const isEventExpiring = () => {
    const eventDate = new Date(event.date);
    const expiryDate = new Date(eventDate);
    expiryDate.setDate(eventDate.getDate() + 2);
    const now = new Date();
    return now > eventDate && now <= expiryDate;
  };

  return (
    <div className={`event-card ${isEventExpiring() ? 'expiring' : ''}`}>
      <div className="event-image-container">
        <img 
          src={event.photo} 
          alt={event.name} 
          className="event-image"
        />
      </div>
      
      <div className="event-content">
        <div className="event-header">
          <Link to={{ pathname: `/event/${event.id}`, state: { event } }}>
            <h3 className="event-name">{event.name}</h3>
          </Link>
          {event.priority === 'yes' && (
            <span className="priority-badge">Important</span>
          )}
          {isEventExpiring() && (
            <span className="expiry-badge">Expiring Soon</span>
          )}
        </div>
        
        <div className="event-meta">
          <div className="meta-item">
            <svg className="meta-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="date-text">{event.date}</span>
          </div>
          
          {event.location && (
            <div className="meta-item">
              <svg className="meta-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="location-text">{event.location}</span>
            </div>
          )}
          
          <div className="meta-item">
            <svg className="meta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
            <span className="notes-text">{event.notes}</span>
          </div>
          
          {event.theme && (
            <span className="theme-badge">{event.theme}</span>
          )}
        </div>
      </div>
      
      
    </div>
  );
};

export default EventCard;