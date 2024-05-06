import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsOps';
import { useDispatch } from 'react-redux';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const initialValues = {
  name: '',
  number: '',
};
export default function ContactForm() {
  const nameFieldId = useId();
  const numberFieldId = useId();

  // const dispatch = useDispatch();

  // const handleSubmit = (values, actions) => {
  //   dispatch(addContact({ id: nanoid(), ...values }));
  //   actions.resetForm();
  // };
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
          />
          <ErrorMessage name="name" component="span" />
        </div>

        <div className={css.thumb}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field
            className={css.formInput}
            type="text"
            name="number"
            id={numberFieldId}
          />
          <ErrorMessage name="number" component="span" />
        </div>
        <button className={css.buttonAdd} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
