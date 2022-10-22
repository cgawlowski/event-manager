import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

// This component receives an array of event objects as props (events)
// and is responsible for displaying them as an ordered list.

const EventList = ({ events }) => {
  // The renderEvents method sorts the array by date in descending order,
  // then renders a list item for each event.
  const renderEvents = (eventArray) => {
    eventArray.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

    // Adding a <NavLink> component, a special kind of <Link> that will add an “active” class
    // to the currently active link, which we can now target through our CSS.
    return eventArray.map((event) => (
      <li key={event.id}>
        <NavLink to={`/events/${event.id}`}>
          {event.event_title}
        </NavLink>
      </li>
    ));
  };

  return (
    <section className="eventList">
      <h2>
        Events
        <Link to="/events/new">New Event</Link>
      </h2>
      <ul>{renderEvents(events)}</ul>
    </section>
  );
};

// prop validation to ensure that the events prop is an array of objects
// and that each object in that array has a certain set of properties, each of a certain type.
EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    event_title: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    event_description: PropTypes.string,
  })).isRequired,
};

export default EventList;
