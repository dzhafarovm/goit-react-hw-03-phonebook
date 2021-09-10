import React, { Component } from "react";
import shortid from "shortid";
import { ContactForm } from "./Components/ContactForm/ContactForm.jsx";
import { ContactList } from "./Components/ContactList/ContactList.jsx";
import { Filter } from "./Components/Filter/Filter.jsx";

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("myContacts");
    const parsContacts = JSON.parse(contacts);
    if (parsContacts) {
      this.setState({ contacts: parsContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("myContacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (data) => {
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    if (
      this.state.contacts.find(
        (con) => con.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${contact.name} is alresdy in contacts`);
      return;
    } else
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact].sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      }));
  };

  deleteContacs = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  onFilterInputValue = (e) => {
    this.setState({ filter: e.target.value });
  };

  onFilteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onFilterInputValue={this.onFilterInputValue} />
        <ContactList
          contacts={this.onFilteredContacts()}
          onDeleteContact={this.deleteContacs}
        />
      </div>
    );
  }
}
