import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ count, location: { pathname }, activeuserscount })=> {
  return (
    <div>
      <h1>The Acme Users</h1>
      <nav>
        <Link to='/' className={ pathname === '/' ? 'active': ''}>Home</Link>
        <Link to='/users' className={ pathname === '/users' ? 'active': ''}>Users({ count })</Link>
        <Link to='/activeusers' className={ pathname === '/activeusers' ? 'active': ''}>Active Users({activeuserscount})</Link>
      </nav>
    </div>
  );
};

const mapStateToProps = ({ users })=> {
  return {
    count: users.length,
    activeuserscount:(users.filter(user => user.active)).length
  };
};

export default connect(mapStateToProps)(Nav);


