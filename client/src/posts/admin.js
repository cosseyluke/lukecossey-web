import * as React from "react";
import { Create, List, Edit, SimpleForm, TabbedForm, FormTab, TextInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, required } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

import CardActions from "@material-ui/core/CardActions";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import EditIcon from "@material-ui/icons/Edit";
import { Show, SimpleShowLayout, Button, Link, ListButton, RefreshButton } from "react-admin";

const blockSort = {field: 'sort_order', order: 'ASC'};
const postSort = {field: 'pub_date', order: 'DESC'};

const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostCreate = (props) => (
    <Create title={<PostTitle />} {...props}>
        <TabbedForm>
          <FormTab label="body">
            <DateInput label="Publication date" source="pub_date" validate={required()} />
            <TextInput source="title" validate={required()} />
            <TextInput source="slug" validate={required()} />
            <RichTextInput source="intro" validate={required()} />
          </FormTab>
          <FormTab label="seo">
            <TextInput label="SEO Title" source="seo.title" />
            <TextInput label="SEO Description" source="seo.description" />
          </FormTab>
        </TabbedForm>
    </Create>
);

const PostBlockEditButton = ({record}) => (
  <Button
    component={Link}
    to={{
      pathname: `/blocks/${record.id}`,
      search: `?post_id=${record.post_id}`,
    }}
    label="Edit">
    <EditIcon />
  </Button>
)

export const PostEdit = (props) => {
  return (
    <Edit title={<PostTitle />} {...props}>
      <TabbedForm>
        <FormTab label="body">
          <TextInput disabled label="Id" source="id" />
          <DateInput label="Publication date" source="pub_date" validate={required()} />
          <TextInput source="title" validate={required()} />
          <TextInput source="slug" validate={required()} />
          <RichTextInput source="intro" validate={required()} />
          <ReferenceManyField label="Blocks" reference="blocks" target="post_id" sort={blockSort}>
            <Datagrid>
              <TextField disabled label="Id" source="id" />
              <TextField source="sort_order" />
              <TextField source="body" />
              <PostBlockEditButton />
            </Datagrid>
          </ReferenceManyField>
        </FormTab>
        <FormTab label="seo">
          <TextInput label="SEO Title" source="seo.title" />
          <TextInput label="SEO Description" source="seo.description" />
        </FormTab>
      </TabbedForm>
    </Edit>
  )
};

const AddNewBlockButton = ({ record }) => {
  if (record) {
    return (
      <Button
        component={Link}
        to={{
          pathname: "/blocks/create",
          search: `?post_id=${record.id}`,
        }}
        label="Add a block"
      >
        <ChatBubbleIcon />
      </Button>
    )
  }

  return (
    <div>Emp</div>
  )
};

const PostShowActions = ({ basePath, data }) => (
  <CardActions>
    <ListButton basePath={basePath} />
    <RefreshButton />
    <AddNewBlockButton record={data} />
  </CardActions>
);

export const PostShow = props => (
  <Show {...props} actions={<PostShowActions />}>
    <SimpleShowLayout>
      <TextField source="title" />
      <DateField source="pub_date" />
      <ReferenceManyField label="Blocks" reference="blocks" target="post_id" sort={blockSort}>
        <Datagrid>
          <TextField disabled label="Id" source="id" />
          <TextField source="sort_order" />
          <TextField source="body" />
          <PostBlockEditButton />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);

export const PostList = (props) => (
    <List {...props} sort={postSort}>
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <DateField source="pub_date" />
        </Datagrid>
    </List>
);
