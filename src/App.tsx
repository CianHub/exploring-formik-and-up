import React from 'react';
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray,
} from 'formik';
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from '@material-ui/core';
import * as yup from 'yup';
import SelectInput from '@material-ui/core/Select/SelectInput';

const validationSchema = yup.object({
  firstName: yup.string().required().max(10),
  pets: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required().max(10),
        type: yup.string().required().max(10),
      })
    ),
});

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
          yoguert: '',
          pets: [{ type: 'dog', name: 'Frank', id: '' + Math.random() }],
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log('submit: ' + JSON.stringify(data));

          // post async call
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
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
              <FieldArray name="pets">
                {(arrayHelpers) => {
                  return (
                    <div>
                      <Button
                        onClick={() =>
                          arrayHelpers.push({
                            type: 'cat',
                            name: '',
                            id: '' + Math.random(),
                          })
                        }
                      >
                        Add pet
                      </Button>
                      {values.pets.map((pet, index) => {
                        const name = `pets.${index}.name`;
                        const itemName = `pets.${index}.type`;
                        const id = `pets.${index}.id`;

                        return (
                          <div key={id}>
                            <MyTextField name={name} placeholder="pet name" />
                            <Field type="select" as={Select} name={itemName}>
                              <MenuItem value="cat">cat</MenuItem>
                              <MenuItem value="dog">dog</MenuItem>
                              <MenuItem value="horse">horse</MenuItem>
                            </Field>
                            <Button onClick={() => arrayHelpers.remove(index)}>
                              Delete pet
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </FieldArray>
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
