import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

class UserCreate extends Component{
  constructor(){
    super();
    this.state = {
      name: '',
      active: true,
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }
  onCreate(ev){
    const { name, active } = this.state; 
    this.props.create({ name, active })
      .then(()=> this.props.history.push('/users'))
      .catch(ex => {
        this.setState({ error: ex.response.data.message })
      });
  }
  onChange(ev){
    let value = ev.target.value;
    if(ev.target.type === 'checkbox'){
      value = ev.target.checked;
    }
    this.setState({ [ev.target.name ] : value });

  }
  render(){
    const { name, active, error } = this.state;
    const { onChange, onCreate } = this;
    const disabled = !name;
    console.log(error);
    return (
      <div className='form'>
        { error && <div className='error'>{ error }</div> }
        <div>
            <label>Name</label>
            <input name='name' value={ name } onChange={ onChange }/>
        </div>
        <div>
            <label>
              Active
              <input type='checkbox' checked={ active } name='active' onChange= { onChange }/>
            </label>
        </div>
        <button disabled={ disabled } onClick={ onCreate } >Create</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    create: (user)=> dispatch(actions.createUser(user))
  };

};

export default connect(null, mapDispatchToProps)(UserCreate);
