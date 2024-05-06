import css from './Contact.module.css';
import { FaUser } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ data: { id, name, number } }) {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <div className={css.containerContac}>
      <div className={css.thumbContact}>
        <p className={css.nameContact}>
          <FaUser /> {name}
        </p>
        <p className={css.nameContact}>
          <FaPhoneAlt /> {number}
        </p>
      </div>
      <button className={css.buttonDelete} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
