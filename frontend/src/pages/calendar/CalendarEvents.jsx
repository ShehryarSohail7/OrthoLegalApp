import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CalendarEvents = ({ apiUrl }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(apiUrl, {
          withCredentials: true, // Ensures user session is sent
        });
        setEvents(response.data);
      } catch (err) {
        setError("Error fetching events. Please try again.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [apiUrl]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Google Calendar Events</h2>
      {events.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {events.map((event) => (
            <li key={event.id} className="text-gray-700">
              <strong>{event.summary}</strong> -{" "}
              {event.start?.dateTime || event.start?.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming events found.</p>
      )}
    </div>
  );
};
CalendarEvents.propTypes = {
  apiUrl: PropTypes.string,
};

export default CalendarEvents;
