import * as React from 'react';

import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import { BlockCreate, BlockEdit, BlockList } from "./blocks/admin";
import { PostCreate, PostEdit, PostList, PostShow } from "./posts/admin";
import { UserCreate, UserEdit, UserList, UserShow } from "./users/admin";

const ADMIN_API_URL = process.env.API_URL
const dataProvider = jsonServerProvider(ADMIN_API_URL);

const AdminComponent = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} show={PostShow} />
    <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} show={UserShow} />
    <Resource name="blocks" edit={BlockEdit} create={BlockCreate} />
  </Admin>
);

export { AdminComponent }
