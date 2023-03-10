import PropTypes from 'prop-types';
import { Component } from 'react';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handlerSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.addContact({ name, number });
    e.target.reset();
  };

  handlerChange = evt => {
    const currentTarget = evt.currentTarget;
    this.setState(() => {
      return {
        [currentTarget.name]: currentTarget.value,
      };
    });
  };

  render() {
    return (
      <form onSubmit={this.handlerSubmit}>
        <label>Name</label>
        <input
          onChange={this.handlerChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label>Phone number</label>
        <input
          onChange={this.handlerChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit">Add to contacts</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
