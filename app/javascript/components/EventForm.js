import React, { useState, useRef, useEffect } from 'react';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';
import PropTypes from 'prop-types';
import { formatDate, isEmptyObject, validateEvent } from '../helpers/helpers';

// Defining two variables in state: event and formErrors.
const EventForm = ({ onSave }) => {
  const [event, setEvent] = useState({
    event_title: '',
    event_description: '',
    start_date: '',
    end_date: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const dateInput = useRef(null);

  const updateEvent = (key, value) => {
    setEvent((prevEvent) => ({ ...prevEvent, [key]: value }));
  };
  // handleInputChange function will be called whenever the user changes the values of any field
  // and it will update the event object, so that it mirrors what has been entered into the form.
  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    updateEvent(name, value);
  };

  useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateEvent('start_date', formattedDate);
        updateEvent('end_date', formattedDate);
      },
    });
    // Return a cleanup function.
    // React will call this prior to unmounting.
    return () => p.destroy();
  }, []);

  // renderErrors returns null if the formErrors object is empty,
  // or otherwise some JSX representing a warning that the form could not be saved,
  // as well as a list of errors.
  const renderErrors = () => {
    if (isEmptyObject(formErrors)) {
      return null;
    }
    return (
      <div className="errors">
        <h3>The following errors prohibited the event from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  // handleSubmit function  validates the user???s input (and check that each field has a value)
  // and either display an error message if anything is missing
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateEvent(event);

    // isEmptyObject returns true or false
    // depending on whether the object it is passed has any properties or not.
    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(event);
    }
  };

  return (
    <section>
      {renderErrors()}

      <h2>New Event</h2>
      <form className="eventForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="event_title">
            <strong>Title:</strong>
            <input
              type="text"
              id="event_title"
              name="event_title"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="start_date">
            <strong>Start date:</strong>
            <input
              type="date"
              id="start_date"
              name="start_date"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="end_date">
            <strong>End date:</strong>
            <input
              type="date"
              id="end_date"
              name="end_date"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="event_description">
            <strong>Description:</strong>
            <textarea
              cols="30"
              rows="10"
              id="event_description"
              name="event_description"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
};

export default EventForm;

EventForm.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  onSave: PropTypes.func.isRequired,
};
