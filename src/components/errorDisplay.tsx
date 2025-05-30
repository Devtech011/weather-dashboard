import React from "react";
import "./WeatherDisplay.css";

interface Props {
  message: string;
  onRetry?: () => void;
  onClose?: () => void;
}

const ErrorDisplay: React.FC<Props> = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Error</h3>
        <p>{message}</p>
        <div className="modal-actions">
          {onClose && <button onClick={onClose}>Close</button>}
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
