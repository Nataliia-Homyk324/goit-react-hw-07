import css from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { useSelector } from 'react-redux';

import { selectFilteredContacts } from '../../redux/selectors';
import { selectIsLoading } from '../../redux/selectors';

export default function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      {filteredContacts.length === 0 && !isLoading ? (
        <p className={css.infoText}>No contacts found </p>
      ) : (
        <ul className={css.list}>
          {filteredContacts.map(contact => (
            <li key={contact.id} className={css.item}>
              <Contact data={contact} />
            </li>
          ))}
        </ul>
      )}
      {filteredContacts.length === 0 && filteredContacts.length !== 0 && (
        <p className={css.infoText}>Your phonebook is empty</p>
      )}
    </>
  );
}
