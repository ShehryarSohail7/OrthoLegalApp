import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import {
  FaCalendarAlt,
  FaUser,
  FaMapMarkerAlt,
  FaStethoscope,
} from "react-icons/fa";
import "../../styles/EventModal.css"; // Add this CSS file for custom styles
import PropTypes from "prop-types";

export function EventModal({ isOpen, onClose, event }) {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-content">
        <DialogHeader className="modal-header">
          <DialogTitle className="modal-title">{event.title}</DialogTitle>
        </DialogHeader>
        <div className="modal-body">
          <table className="info-table">
            <tbody>
              <InfoRow
                icon={<FaCalendarAlt className="icon" />}
                label="Start"
                value={new Date(event.start).toLocaleString()}
              />
              <InfoRow
                icon={<FaCalendarAlt className="icon" />}
                label="End"
                value={new Date(event.end).toLocaleString()}
              />
              {event.details?.status && (
                <InfoRow label="Status" value={event.details.status} />
              )}
              {event.details?.client && (
                <InfoRow
                  icon={<FaUser className="icon" />}
                  label="Client"
                  value={event.details.client}
                />
              )}
              {event.details?.doctor && (
                <InfoRow
                  icon={<FaStethoscope className="icon" />}
                  label="Doctor"
                  value={event.details.doctor}
                />
              )}
              {event.details?.location && (
                <InfoRow
                  icon={<FaMapMarkerAlt className="icon" />}
                  label="Location"
                  value={event.details.location}
                />
              )}
              {event.details?.assistant && (
                <InfoRow label="Assistant" value={event.details.assistant} />
              )}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}

EventModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  event: PropTypes.object,
};

function InfoRow({ icon, label, value }) {
  return (
    <tr>
      <td className="info-label">
        {icon && <span className="icon-container">{icon}</span>}
        {label}:
      </td>
      <td className="info-value">{value}</td>
    </tr>
  );
}

InfoRow.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  value: PropTypes.string,
};
