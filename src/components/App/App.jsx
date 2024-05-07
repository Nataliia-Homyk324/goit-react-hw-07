import css from './App.module.css';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contactsOps';
import { selectIsLoading, selectError } from '../../redux/selectors';
import Error from '../Error/Error';
import { ThreeDots } from 'react-loader-spinner';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <div className={css.containerLoader}>
        {isLoading && !isError && (
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#6f6e6e"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </div>
      {isError && (
        <Error>
          Whoops, something went wrong! <br />
          Please try reloading this page!
        </Error>
      )}
      <ContactList />
    </div>
  );
}
