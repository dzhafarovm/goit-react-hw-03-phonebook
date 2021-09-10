import React from "react";
import css from "./ContactList.module.css";

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          <span>{name}: </span>
          <span>{number}</span>
          <button className={css.btn} onClick={() => onDeleteContact(id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};
