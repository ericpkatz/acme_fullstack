import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

const Users = ({ users, destroyUser, toggleUser })=> {
  return (
    <ul>
      {
        users.map( user => <li key={ user.id }>
          { user.name }
          <button onClick={()=> destroyUser(user)}>x</button>
          <button onClick={()=> toggleUser(user)}>{ user.active ? 'Make Inactive': 'Make Active'}</button>
        </li>)
      }
    </ul>
  );
};

export default connect(({ users }, { location })=> {
  let filtered = users; 
  if(location.pathname === '/users/active'){
    filtered = users.filter( user => user.active );
  }
  return {
    users: filtered
  };
}, (dispatch)=> {
  return {
    destroyUser: (user)=> dispatch(actions.destroyUser(user)),
    toggleUser: (user)=> dispatch(actions.updateUser({...user, active: !user.active}))
  };
})(Users);
