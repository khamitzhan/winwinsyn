import React from "react";
import classNames from "classnames";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={classNames(
        "px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-black",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;