import React from 'react';
import { Formik, Field, Form, useField, FieldAttributes } from 'formik';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  TextField,
} from '@material-ui/core';
import { isPropertySignature } from 'typescript';

type Props = {
  label: string;
} & FieldAttributes<{}>;

const MyRadio: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...field}
      helperText={errorText}
      placeholder={placeholder}
      error={!!errorText}
    />
  );
};

function App() {
  return (
    <div className="App" role="application">
      <Formik
        initialValues={{
          firstName: 'bob',
          lastName: '',
          isTall: false,
          cookies: [],
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log('submit: ' + JSON.stringify(data));

          // post async call
          setSubmitting(false);
        }}
        validate={(values) => {
          const errors: Record<string, string> = {};

          if (values.firstName.includes('bob')) {
            errors.firstName = 'no bob';
          }

          return errors;
        }}
      >
        {({ values, errors, isSubmitting, handleChange, handleBlur }) => (
          <Form>
            <div>
              <MyTextField
                name="firstName"
                type="input"
                placeholder="firstName"
              />
            </div>
            <div>
              <Field
                name="lastName"
                type="input"
                placeholder="lastName"
                as={TextField}
              />
            </div>
            <div>
              <Field name="isTall" type="checkbox" as={Checkbox} />
            </div>
            <div>
              <p>Cookies</p>
              <Field
                name="cookies"
                type="checkbox"
                value="chocolate"
                as={Checkbox}
              />
              <Field
                name="cookies"
                type="checkbox"
                value="ice cream"
                as={Checkbox}
              />
              <Field
                name="cookies"
                type="checkbox"
                value="sugar"
                as={Checkbox}
              />
            </div>
            <div>
              <MyRadio name="yogurt" type="radio" value="peach" label="peach" />
              <MyRadio name="yogurt" type="radio" value="apple" label="apple" />
              <MyRadio
                name="yogurt"
                type="radio"
                value="dog food"
                label="dog food"
              />
            </div>
            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>
            <pre>{JSON.stringify(values)}</pre>
            <pre>{JSON.stringify(errors)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
