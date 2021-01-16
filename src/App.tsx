import React from 'react';
import { Formik, Field, Form, useField, FieldAttributes } from 'formik';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  TextField,
} from '@material-ui/core';

type Props = {
  label: string;
} & FieldAttributes<{}>;

const MyRadio: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
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
      >
        {({ values, isSubmitting, handleChange, handleBlur }) => (
          <Form>
            <div>
              <Field
                name="firstName"
                type="input"
                placeholder="firstName"
                as={TextField}
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
            </div>
            <div>
              <Button disabled={isSubmitting} type="submit">
                Submit
              </Button>
            </div>
            <pre>{JSON.stringify(values)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
