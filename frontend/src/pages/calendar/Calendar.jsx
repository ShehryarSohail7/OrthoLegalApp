import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { CalendarHeader } from "./CalendarHeader";
import { EventModal } from "./EventModal";
import { Card } from "./Card";
import axios from "axios"; // Ensure axios is installed
import CalendarEvents from "./CalendarEvents";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch appointments from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/appointments/",
          {
            headers: {
              //Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Use your authentication token
            },
          }
        );

        // Map the response data to FullCalendar event format
        const fetchedEvents = response.data.map((appointment) => ({
          id: appointment.id,
          title: `Appointment with ${appointment.doctor?.name || "Unkown"}`, // Customize title
          start: `${appointment.date}T${appointment.time}`,
          extendedProps: {
            status: appointment.status,
            client: appointment.client.name,
            doctor: appointment.doctor.name,
            location: appointment.location.name,
            assistant: appointment.medical_assistant.name,
          },
        }));

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (info) => {
    setSelectedEvent({
      title: info.event.title,
      start: info.event.start,
      end: info.event.end || info.event.start,
      details: info.event.extendedProps,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CalendarHeader />
      <main className="container mx-auto py-8 px-4">
        <Card className="p-6 shadow-lg">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            events={events}
            eventClick={handleEventClick}
            nowIndicator={true}
            height="auto"
            eventColor="#000051"
            buttonText={{
              today: "Today",
              month: "Month",
              week: "Week",
              day: "Day",
              list: "List",
            }}
            buttonIcons={{
              prev: "chevron-left",
              next: "chevron-right",
            }}
            dayMaxEvents={true}
            views={{
              timeGrid: {
                dayMaxEvents: 6,
              },
            }}
          />
        </Card>
      </main>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
      />
      <CalendarEvents apiUrl="http://localhost:8000/api/google-calendar/events/" />
    </div>
  );
};

export default Calendar;
