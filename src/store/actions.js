import { UPDATE_USER, DESTROY_USER, SET_USERS, SET_LOADING } from './constants';
import axios from 'axios';


const setUsers = (users)=> {
  return {
    users,
    type: SET_USERS
  };
};

const setLoading = (loading)=> {
  return {
    type: SET_LOADING,
    loading
  };
};

const _destroyUser = (user)=> {
  return {
    type: DESTROY_USER,
    user
  };
};

const _updateUser = (user)=> {
  return {
    type: UPDATE_USER,
    user
  };
};


const fetchUsers = ()=> {
  return async(dispatch)=> {
    dispatch(setLoading(true));
    const users = (await axios.get('/api/users')).data;
    dispatch(setLoading(false));
    return dispatch(setUsers(users));
  };
};

const destroyUser = (user)=> {
  return async(dispatch)=> {
    dispatch(setLoading(true));
    await axios.delete(`/api/users/${user.id}`);
    dispatch(setLoading(false));
    return dispatch(_destroyUser(user));
  };
};

const updateUser = (user)=> {
  return async(dispatch)=> {
    dispatch(setLoading(true));
    await axios.put(`/api/users/${user.id}`, user);
    dispatch(setLoading(false));
    return dispatch(_updateUser(user));
  };
};

export { fetchUsers, destroyUser, updateUser };
