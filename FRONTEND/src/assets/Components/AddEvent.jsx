import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEvent({ onAddEvent, currentUserId }) {
  const [event, setEvent] = useState({
    title: '',
    date: '',
    location: '',
    theme: 'Technology', // Default theme
    description: '',
    coverImage: null,
    status: 'draft',
    type: 'workshop',
    priority: 'no',
    creatorId: currentUserId // Initialize with current user ID
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const themeOptions = [
    'Technology', 'Business', 'Art', 
    'Science', 'Health', 'Education',
    'Entertainment', 'Sports', 'Other'
  ];

  const navigate = useNavigate();

  useEffect(() => {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    setEvent(prev => ({ ...prev, date: prev.date || today }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newEvent = {
        ...event,
        id: Date.now().toString(),
        creatorId: currentUserId, // Ensure creatorId is set
        date: new Date(event.date).toISOString() // Standardize date format
      };

      onAddEvent(newEvent);
      navigate('/');
    } catch (error) {
      console.error('Error creating event:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image
      if (!file.type.match('image.*')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setEvent(prev => ({ ...prev, coverImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="add-event-container">
      <div className="form-header">
        <h2>Create New Event</h2>
        <p>Fill in the details below to add your event</p>
      </div>
      
      <form onSubmit={handleSubmit} className="event-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Event Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
            placeholder="Enter event title"
            minLength="5"
            maxLength="100"
          />
        </div>

        {/* Cover Image */}
        <div className="form-group">
          <label>Cover Image</label>
          <div className="image-upload-container">
            <label className="upload-label">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload} 
              />
              <span className="upload-button">Choose Image</span>
              <span className="file-info">
                {event.coverImage ? 'Image selected' : 'No image selected'}
              </span>
            </label>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button 
                  type="button" 
                  className="remove-image"
                  onClick={() => {
                    setImagePreview(null);
                    setEvent(prev => ({ ...prev, coverImage: null }));
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <p className="image-hint">Recommended size: 1200x630px (Max 2MB)</p>
        </div>

        {/* Date and Location */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date*</label>
            <input
              type="date"
              id="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location*</label>
            <input
              type="text"
              id="location"
              name="location"
              value={event.location}
              onChange={handleChange}
              required
              placeholder="Event venue"
              minLength="3"
              maxLength="100"
            />
          </div>
        </div>

        {/* Type and Status */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Event Type*</label>
            <select
              id="type"
              name="type"
              value={event.type}
              onChange={handleChange}
              required
            >
              <option value="workshop">Workshop</option>
              <option value="tradeFair">Trade Fair</option>
              <option value="conference">Conference</option>
              <option value="seminar">Seminar</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status*</label>
            <select
              id="status"
              name="status"
              value={event.status}
              onChange={handleChange}
              required
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Theme and Priority */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="theme">Theme*</label>
            <select
              id="theme"
              name="theme"
              value={event.theme}
              onChange={handleChange}
              required
            >
              {themeOptions.map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={event.priority}
              onChange={handleChange}
            >
              <option value="no">Normal</option>
              <option value="yes">Important</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            rows="5"
            placeholder="Enter event details..."
            required
            minLength="20"
            maxLength="2000"
          />
          <p className="character-count">
            {event.description.length}/2000 characters
          </p>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;