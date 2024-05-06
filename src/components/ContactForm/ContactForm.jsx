import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsOps';
import { useDispatch } from 'react-redux';
import { BsPhone, BsPerson } from 'react-icons/bs';
const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, 'Invalid phone number format')
    .required('Required'),
});

const initialValues = {
  name: '',
  number: '',
};
export default function ContactForm() {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.containerForm}>
        <div className={css.thumb}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            className={css.formInput}
            type="text"
            name="name"
            id={nameFieldId}
            placeholder="Name"
          />
          <BsPerson className={css.iconInput} size="20" />
          <ErrorMessage name="name" component="span" />
        </div>

        <div className={css.thumb}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field
            className={css.formInput}
            type="text"
            name="number"
            id={numberFieldId}
            placeholder="xxx-xxx-xxxx"
          />
          <BsPhone className={css.iconInput} size="20" />
          <ErrorMessage name="number" component="span" />
        </div>
        <button className={css.buttonAdd} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
