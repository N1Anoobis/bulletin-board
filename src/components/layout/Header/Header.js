import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { getUsers  } from '../../../redux/userReducer';
import { setGlobalStatus } from '../../../redux/statusRedux';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

class Component extends React.Component {

  state = {
    status: 'denided',
    value: ''
  }

  handleChange = event => {
    this.setState({
      status: event.target.value,
      value: event.target.value
    });
    this.props.setStatus(event.target.value)
  };

  render() {
    const { className, children, users } = this.props;
    const { status } = this.state;

    var usersArray = [];
for (var i = 0; i < users.length; i++) {
    usersArray.push(users[i]);
}
    
    return (
      <div className={clsx(className)}>
        <nav className={styles.root}>

        <FormControl variant="outlined" color="primary" >
        <InputLabel className={styles.discription} id="demo-simple-select-autowidth-label">acces {this.state.value}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.value}
          onChange={this.handleChange}
          label="Age"
          className={styles.select}
        > {usersArray.map(user => {
          return (
          <MenuItem key={user.id} value={user.status}>{user.name}</MenuItem>
          )})}
        </Select>
        <FormHelperText className={styles.discription} >permission level</FormHelperText>
      </FormControl>
          {status === 'granted' && <Button className={styles.link} component={NavLink} exact to={`/`} activeClassName='active'>HomePage</Button>}
          {status === 'granted' && <Button className={styles.link} component={NavLink} exact to={`/post/myposts`} activeClassName='active'>My Posts</Button>}
          {status === 'granted' && <Button className={styles.link} component={NavLink} exact to={`/post/add`} activeClassName='active'>Add Post</Button>}
          {status === 'granted' && <Button className={styles.link} component={NavLink} exact to={`/`}>Log out</Button>}
          {status === 'denided' && <Button><a href="https://google.com" className={styles.select}>Log in</a></Button>}
        </nav>
        {children}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  
};

const mapStateToProps = state => ({
  users: getUsers(state),
});

const mapDispatchToProps = dispatch => ({
  setStatus: globalStatus => dispatch(setGlobalStatus(globalStatus)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Header,
  Component as HeaderComponent,
};
