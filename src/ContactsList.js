import React from 'react';
import Contact from './Contact';

class ContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            contacts: props.contacts
        };

        this.updateSerach = this.updateSerach.bind(this)
        this.addContact = this.addContact.bind(this)
    }

    updateSerach(event) {
        this.setState({search: event.target.value})
    }

    addContact(event) {
        event.preventDefault();
        let name = this.refs.name.value;
        let phone = this.refs.phone.value;
        let id = Math.floor((Math.random() * 100) + 1)
        this.setState({
            contacts: this.state.contacts.concat({id, name, phone})
        })
        this.refs.name.value = '';
        this.refs.phone.value = '';
    }

    render() {
        let filteredContacts = this.state.contacts.filter(
            (contact) => {
                return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1});
        return (
            <div>
                <input type="text"
                    placeholder="Search"
                    value={this.state.search}
                    onChange={this.updateSerach}
                />
                <form onSubmit={this.addContact}>
                    <input type="text" ref="name"/>
                    <input type="text" ref="phone"/>
                    <button type="submit">Add New Contact</button>
                </form>
                <ul>
                    {
                        filteredContacts.map((contact) => {
                            return <Contact contact={contact} key={contact.id}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default ContactsList;
