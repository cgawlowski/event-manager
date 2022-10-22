export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

// validateEvent runs a bunch of checks on the event object
// (an event title must be entered, and it should be < 32 characters)
// and returns an object containing any errors
export const validateEvent = (event) => {
  const errors = {};

  if (event.event_title === '') {
    errors.event_title = 'You must enter an event title';
  }

  if (event.event_title.length > 32) {
    errors.event_title = 'You must enter a shorter title (32 characters maximum)';
  }

  return errors;
};

export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};
