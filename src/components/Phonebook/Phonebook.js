import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from './form';
import { ContactList } from './contactList';
import { Filter } from './Filter';

export class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    this.setState({ contacts: contacts || [] });
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert('Person already in contacts');
      return;
    }

    this.setState(({ contacts }) => {
      return {
        contacts: [...contacts, { ...contact, id: nanoid() }],
      };
    });
  };

  handleFilter = evt => {
    this.setState(() => {
      return {
        filter: evt.target.value.toLowerCase(),
      };
    });
  };

  handleDelete = id => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(contact => contact.id !== id),
      };
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm addContact={this.addContact} />
        </div>

        <div>
          <h2>Contacts</h2>
          <Filter onChange={this.handleFilter} />
          {contacts.length > 0 && (
            <ContactList
              contacts={filteredContacts}
              handleDelete={this.handleDelete}
            />
          )}
        </div>
      </>
    );
  }
}
