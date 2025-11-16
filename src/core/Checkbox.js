import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];

    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }

    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories
    .sort((a, b) => a.name.localeCompare(b.name)) // sort by name ascending
    .map((c, i) => {
      return (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggle(c._id)}
            type="checkbox"
            className="form-check-input"
            checked={checked.includes(c._id)}
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      );
    });
};

export default Checkbox;
