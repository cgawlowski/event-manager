import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import EventList from './EventList';
import Event from './Event';
import EventForm from './EventForm';

// Basically here we 1) contact our API,
// 2) grab a list of event
// 3) and pass them to the <EventList> component, so that it can display them on the page.

// We employ the useState hook to declare three variables in state (events, isLoading and isError),
// as well as functions to set the values of these variables.
// We also assign them some initial values.

const Editor = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // Next comes a useEffect hook to handle our data fetching.
  // As we are passing it an empty array as a second argument,
  // this will run once when the component is rendered.

  useEffect(() => {
    // Inside the useEffect hook, we declare a fetchData function,
    // which uses the Fetch API to hit the /api/events endpoint.
    // Assuming this returns a valid JSON response (a list of events),
    // we save that to the events variable in state.
    const fetchData = async () => {
      // The data fetching happens within a try... catch block,
      // so that we can handle any errors that might occur
      try {
        // eslint-disable-next-line no-undef
        const response = await window.fetch('/api/events');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
      // Once the data fetching has completed, we set the isLoading variable to false.
      setIsLoading(false);
    };
    // The last thing we do is to invoke the fetchData function.
    // We need a separate function here, as we cannot mark the callback function we pass
    // to the useEffect hook as being async.
    fetchData();
  }, []);

  // addEvent method receives a newEvent object and then launches a request
  // to our API to create a new event using that data.
  const addEvent = async (newEvent) => {
    try {
      // eslint-disable-next-line no-undef
      const response = await window.fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(newEvent),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

      // If the request is successful, it will add the newly created event to the array of events
      // that are being held in state and the UI will update accordingly.
      const savedEvent = await response.json();
      const newEvents = [...events, savedEvent];
      setEvents(newEvents);
      // eslint-disable-next-line no-undef
      window.alert('Event Added!');
      // If the request is successfull, the navigate function (from the useNavigate hook)
      // will change the URL to that of the newly created event.
      navigate(`/events/${savedEvent.id}`);
      // If the API request is not successful,the error is logged to the console.
    } catch (error) {
      console.error(error);
    }
  };

  // Here we return some JSX: the <Header> component
  // then either an error message, a loading message, or the <EventList> component
  // to which we pass a list of events.
  // The <Editor> component works out which of these to render based on
  // the value of the isError and isLoading variables we declared previously.
  return (
    <>
      <Header />
      <div className="grid">
        {isError && <p>Something went wrong. Check the console.</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <EventList events={events} />

            <Routes>
              <Route path="new" element={<EventForm onSave={addEvent} />} />
              <Route path=":id" element={<Event events={events} />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
};

export default Editor;
