import * as React from "react";
import { Create, List, Edit, SimpleForm, ReferenceInput, SelectInput, ReferenceField, NumberField, NumberInput, Datagrid, TextField, required } from 'react-admin';
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
  const { post_id: post_id_string } = parse(props.location.search);
  const post_id = post_id_string ? post_id_string : "";
  const redirect = post_id ? `/posts/${post_id}/show` : "show";

  return (
    <Edit {...props}>
        <SimpleForm redirect={redirect}>
            <NumberInput source="sort_order" validate={required()} />
            <RichTextInput source="body" validate={required()} />
            <ReferenceInput label="Post" source="post_id" reference="posts">
              <SelectInput optionText="title" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
  )
};
