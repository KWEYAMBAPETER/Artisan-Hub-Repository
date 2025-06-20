import { useParams, Link, useNavigate } from 'react-router-dom';

const EventDetail = ({ events}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);

  

  if (!event) {
    return (
      <div className="not-found-container">
        <h2>Event Not Found</h2>
        <Link to="/" className="home-link">
          Return to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="event-detail-page">
      {/* Header Section */}
      <header className="event-header">
        <div className="header-top">
          <Link to="/" className="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back to Events
          </Link>
          
          
          
        </div>

        <div className="header-content">
          <div className="event-meta">
            <span className={`event-status ${event.status}`}>
              {event.status}
            </span>
            <span className={`event-type ${event.type}`}>
              {event.type.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            {event.theme && (
              <span className="event-theme">
                {event.theme}
              </span>
            )}
          </div>
          <h1>{event.title}</h1>
          <div className="event-date-location">
            <span className="date">
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {event.location && (
              <span className="location">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                {event.location}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {event.coverImage && (
        <div className="cover-image-container">
          <img 
            src={event.coverImage} 
            alt={event.title}
            className="cover-image"
          />
        </div>
      )}

      {/* Main Content */}
      <main className="event-content">
        <section className="description-section">
          <h2>Event Description</h2>
          <div className="description-text">
            {event.description.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="details-section">
          <div className="detail-card">
            <h3>Date & Time</h3>
            <p>
              {new Date(event.date).toLocaleString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          {event.location && (
            <div className="detail-card">
              <h3>Location</h3>
              <p>{event.location}</p>
            </div>
          )}

          <div className="detail-card">
            <h3>Event Type</h3>
            <p className="capitalized">{event.type.replace(/([A-Z])/g, ' $1').trim()}</p>
          </div>

          {event.theme && (
            <div className="detail-card">
              <h3>Theme</h3>
              <p>{event.theme}</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer CTA */}
      <footer className="event-footer">
        <Link to="/" className="register-button">
          Back to Home Page
        </Link>
      </footer>
    </div>
  );
};

export default EventDetail;