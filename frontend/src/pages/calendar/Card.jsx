import React from "react";
import PropTypes from "prop-types";

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
));

Card.propTypes = {
  className: PropTypes.string,
};
Card.displayName = "Card";
