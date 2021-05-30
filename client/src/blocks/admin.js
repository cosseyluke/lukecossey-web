import * as React from "react";
import { Create, List, Edit, SimpleForm, SingleFieldList, ReferenceInput, SelectInput, ReferenceField, NumberField, ChipField, TextInput, NumberInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, required } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { parse } from "query-string";

export const BlockCreate = props => {
  const { post_id: post_id_string } = parse(props.location.search);
  const post_id = post_id_string ? post_id_string : "";
  const redirect = post_id ? `/posts/${post_id}/show` : "show";

  return (
    <Create {...props}>
      <SimpleForm
        defaultValue={{ post_id }}
        redirect={redirect}
      >
        <NumberInput source="sort_order" validate={required()} />
        <RichTextInput source="body" validate={required()} />
        <ReferenceInput label="Post" source="post_id" reference="posts">
          <SelectInput optionText="title" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

export const BlockEdit = (props) => {
  return (
    <Edit {...props} redirect="show">
        <SimpleForm>
            <NumberInput source="sort_order" validate={required()} />
            <RichTextInput source="body" validate={required()} />
            <ReferenceInput label="Post" source="post_id" reference="posts">
              <SelectInput optionText="title" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
  )
};

export const BlockList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <NumberField source="sort_order" />
            <TextField source="body" />
            <ReferenceField source="post_id" reference="posts"><TextField source="id" /></ReferenceField>
        </Datagrid>
    </List>
);
