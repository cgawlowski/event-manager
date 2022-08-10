import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const Event = ({ events }) => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  return (
    <div className="eventContainer">
      <h2>
        {event.event_title}
      </h2>
      <ul>
        <li>
          <strong>Title: </strong>
          {event.event_title}
        </li>
        <li>
          <strong>Start date: </strong>
          {event.start_date}
        </li>
        <li>
          <strong>End date: </strong>
          {event.end_date}
        </li>
        <li>
          <strong>Description: </strong>
          {event.event_description}
        </li>
      </ul>
    </div>
  );
};

Event.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      event_title: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
      event_description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Event;
