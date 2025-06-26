import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EventList({ events, onRemoveEvent, currentUserId }) {
  const [eventToDelete, setEventToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Auto-remove events expired more than 2 days ago
      events.forEach(event => {
        const eventDate = new Date(event.date);
        const expiryDate = new Date(eventDate);
        expiryDate.setDate(eventDate.getDate() + 2);
        
        if (now > expiryDate) {
          onRemoveEvent(event.id);
        }
      });
    }, 60000);
    
    return () => clearInterval(timer);
  }, [events, onRemoveEvent]);

  // Status and type mappings (preserved from original)
  const statusClasses = {
    draft: 'status-draft',
    published: 'status-published',
    cancelled: 'status-cancelled'
  };

  const typeIcons = {
    workshop: '📚',
    tradeFair: '🏪',
    conference: '🎤',
    seminar: '🎓'
  };

  // Calculate days remaining/expired (creative but simple)
  const getDateStatus = (eventDate) => {
    const date = new Date(eventDate);
    const now = new Date();
    const timeDiff = date - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
      const daysExpired = Math.abs(daysDiff);
      return {
        text: daysExpired <= 2 ? `Ended ${daysExpired} day${daysExpired === 1 ? '' : 's'} ago` : null,
        className: 'ended'
      };
    } else if (daysDiff === 0) {
      return {
        text: 'Today!',
        className: 'today'
      };
    } else if (daysDiff <= 7) {
      return {
        text: `${daysDiff} day${daysDiff === 1 ? '' : 's'} left`,
        className: 'soon'
      };
    } else {
      return {
        text: date.toLocaleDateString(),
        className: 'upcoming'
      };
    }
  };

  // Original filter logic preserved
  const filteredEvents = events.filter(event => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      event.title.toLowerCase().includes(term) ||
      (event.location && event.location.toLowerCase().includes(term))
    );
  });

  return (
    <div className="event-list-container">
      <h2 className="event-list-title">Upcoming Events</h2>
      
      {/* Preserved search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="no-events-message">
          {events.length === 0 ? 'No events found. Add one!' : 'No matching events found.'}
        </p>
      ) : (
        <div className="events-grid">
          {filteredEvents.map(event => {
            const dateStatus = getDateStatus(event.date);
            
            return (
              <div 
                key={event.id} 
                className={`event-card ${dateStatus.className}`}
              >
                {event.coverImage && (
                  <div className="event-image-container">
                    <img 
                      src={event.coverImage} 
                      alt={event.title}
                      className="event-image"
                    />
                    {dateStatus.text && (
                      <div className={`date-bubble ${dateStatus.className}`}>
                        {dateStatus.text}
                      </div>
                    )}
                  </div>
                )}

                <div className="event-content">
                  <div className="event-header">
                    <div>
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-meta">
                        <span className="event-date">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        {event.location && (
                          <span className="event-location"> • {event.location}</span>
                        )}
                      </p>
                    </div>
                    <span className="event-type-icon">{typeIcons[event.type]}</span>
                  </div>

                  {/* Preserved status and theme badges */}
                  <div className="event-tags">
                    <span className={`status-badge ${statusClasses[event.status]}`}>
                      {event.status}
                    </span>
                    {event.theme && (
                      <span className="theme-badge">{event.theme}</span>
                    )}
                  </div>

                  <p className="event-description">
                    {event.description.length > 100 
                      ? `${event.description.substring(0, 100)}...` 
                      : event.description}
                  </p>

                  {/* Preserved actions */}
                  <div className="event-actions">
                    <Link to={`/event/${event.id}`} className="view-details-link">
                      View Details
                    </Link>
                    
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

        </div>
      
    
  );
}

export default EventList;