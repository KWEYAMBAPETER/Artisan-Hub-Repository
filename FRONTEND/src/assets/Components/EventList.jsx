import { useState } from 'react';
import { Link } from 'react-router-dom';

function EventList({ events, onRemoveEvent, currentUserId }) {
  const [eventToDelete, setEventToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Status and type mappings
  const statusClasses = {
    draft: 'status-draft',
    published: 'status-published',
    cancelled: 'status-cancelled'
  };

  const typeIcons = {
    workshop: '📚',
    tradeFair: '🏪',
    conference: '🎤'
  };

  // Calculate if event is expiring soon (within 2 days after event date)
  const isEventExpiring = (eventDate) => {
    const date = new Date(eventDate);
    const expiryDate = new Date(date);
    expiryDate.setDate(date.getDate() + 2);
    const now = new Date();
    return now > date && now <= expiryDate;
  };

  const handleDeleteClick = (id) => {
    setEventToDelete(id);
  };

  const confirmDelete = () => {
    onRemoveEvent(eventToDelete);
    setEventToDelete(null);
  };

  const cancelDelete = () => {
    setEventToDelete(null);
  };

  // Filter events based on search term (title or location)
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
      
      {/* Search Bar */}
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
          {filteredEvents.map(event => (
            <div 
              key={event.id} 
              className={`event-card ${isEventExpiring(event.date) ? 'expiring' : ''}`}
            >
              {/* Cover Image */}
              {event.coverImage && (
                <div className="event-image-container">
                  <img 
                    src={event.coverImage} 
                    alt={event.title}
                    className="event-image"
                  />
                </div>
              )}

              <div className="event-content">
                <div className="event-header">
                  <div>
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="event-location">{event.location}</p>
                    {isEventExpiring(event.date) && (
                      <p className="expiry-warning">Expires soon</p>
                    )}
                  </div>
                  <span className="event-type-icon">{typeIcons[event.type]}</span>
                </div>

                {/* Status and Theme */}
                <div className="event-tags">
                  <span className={`status-badge ${statusClasses[event.status]}`}>
                    {event.status}
                  </span>
                  {event.theme && (
                    <span className="theme-badge">{event.theme}</span>
                  )}
                </div>

                <p className="event-description">{event.description}</p>

                <div className="event-actions">
                  <Link to={`/event/${event.id}`} className="view-details-link">
                    View Details
                  </Link>
                  
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;