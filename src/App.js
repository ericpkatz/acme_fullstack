import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { actions } from './store';
import { connect } from 'react-redux'; 
import Nav from './Components/Nav';
import Users from './Components/Users';
import UserCreate from './Components/UserCreate';


class App extends Component{
  componentDidMount(){
    this.props.fetchUsers();
  }
  render(){
    const { loading } = this.props;
    return (
      <HashRouter>
        <Route component={ Nav } />
        {
          loading && <div>...loading</div>
        }
        <Route path='/users' exact component={ Users } />
        <Route path='/users/create' component={ UserCreate } />
      </HashRouter>
    );
  }
} 

const mapDispatchToProps = (dispatch)=> {
  return {
    fetchUsers: ()=> dispatch(actions.fetchUsers())
  };
};

const mapStateToProps = ({loading})=> {
  return {
    loading
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
