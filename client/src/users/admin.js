import * as React from "react";
import { Create, List, Edit, SimpleForm, TextInput, PasswordInput, DateInput, Datagrid, TextField, DateField, required } from 'react-admin';
import { Show, SimpleShowLayout } from "react-admin";

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.email}"` : ''}</span>;
};

export const UserCreate = (props) => (
    <Create title={<UserTitle />} {...props}>
        <SimpleForm>
          <TextInput label="Email Address" source="email" type="email" validate={required()} />
          <PasswordInput label="Password" source="password" validate={required()} />
          <TextInput source="first_name" />
          <TextInput source="last_name" />
        </SimpleForm>
    </Create>
);

export const UserEdit = (props) => {
  return (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <DateInput disabled label="Created" source="created" />
            <TextInput label="Email Address" source="email" type="email" validate={required()} />
            <TextInput source="first_name" />
            <TextInput source="last_name" />
        </SimpleForm>
    </Edit>
  )
};

export const UserShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="email" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <DateField source="created" />
    </SimpleShowLayout>
  </Show>
);

export const UserList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="email" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <DateField source="created" />
        </Datagrid>
    </List>
);
