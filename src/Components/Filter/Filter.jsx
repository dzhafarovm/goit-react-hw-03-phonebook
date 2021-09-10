import React from "react";

export const Filter = ({ value, onFilterInputValue }) => {
  return (
    <label>
      Find contacts by name
      <input type="text" value={value} onChange={onFilterInputValue} />
    </label>
  );
};
