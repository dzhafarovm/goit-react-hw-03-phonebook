import React, { Component } from "react";
import shortid from "shortid";
import css from "./ContactForm.module.css";

export class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  nameId = shortid.generate();
  numberId = shortid.generate();

  handleContactChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className={css.form}>
          <label htmlFor={this.nameId} className={css.label}>
            Name:
            <input
              className={css.name}
              type="text"
              name="name"
              value={this.state.name}
              id={this.nameId}
              onChange={this.handleContactChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
          </label>

          <br />

          <label htmlFor={this.numberId} className={css.label}>
            Number:
            <input
              className={css.number}
              type="tel"
              name="number"
              value={this.state.number}
              id={this.numberId}
              onChange={this.handleContactChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
            />
          </label>

          <br />

          <button type="submit" className={css.btn}>
            add contact
          </button>
        </form>
      </div>
    );
  }
}
