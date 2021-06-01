import * as React from 'react';

import { Admin, Resource, fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import authProvider from "./authProvider";
import { BlockCreate, BlockEdit, BlockList } from "./blocks/admin";
import { PostCreate, PostEdit, PostList, PostShow } from "./posts/admin";
import { UserCreate, UserEdit, UserList, UserShow } from "./users/admin";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  options.credentials = 'include';
  return fetchUtils.fetchJson(url, options);
}

const dataProvider = jsonServerProvider(process.env.API_URL, httpClient);

const AdminComponent = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} show={PostShow} />
    <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} show={UserShow} />
    <Resource name="blocks" edit={BlockEdit} create={BlockCreate} />
  </Admin>
);

export { AdminComponent }
