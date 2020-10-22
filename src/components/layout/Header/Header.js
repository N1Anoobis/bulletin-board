import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { getUsers } from '../../../redux/userReducer';
import { setGlobalStatus, globalStatus } from '../../../redux/statusRedux';
import { connect } from 'react-redux';
import LoginButton from '../../features/LoginButton';
import LogoutButton from '../../features/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

const Component = ({ className, users, setStatus }) => {
  const { isAuthenticated, user } = useAuth0();
  const [value, setValue] = useState('denided');

  const handleChange = event => {
    setValue(event.target.value);
    setStatus(event.target.value);
  };

  React.useEffect(() => {
    (isAuthenticated) ? setStatus('granted') && setValue('granted') : setStatus('denided') && setValue('denided');
  }, [isAuthenticated]);

  let usersArray = [];
  if (users) {
    for (var i = 0; i < users.length; i++) {
      usersArray.push(users[i]);
    }
  }

  return (
    <div className={clsx(className)}>
      <nav className={styles.root}>
        <FormControl variant="outlined" color="primary" >
          <InputLabel className={styles.discription} id="demo-simple-select-autowidth-label">acces {value}</InputLabel>
          {isAuthenticated && <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={handleChange}
            label="Age"
            className={styles.select}
          > {usersArray.map(user => {
              return (
                <MenuItem key={user.id} value={user.status}>{user.name}</MenuItem>
              );
            })}
          </Select>}
          <FormHelperText className={styles.discription} >permission level</FormHelperText>
        </FormControl>
        {value !== 'denided' && <Button className={styles.link} component={NavLink} exact to={`/`} activeClassName='active'>HomePage</Button>}
        {value !== 'denided' && <Button className={styles.link} component={NavLink} exact to={`/post/myposts`} activeClassName='active'>My Posts</Button>}
        {value !== 'denided' && <Button className={styles.link} component={NavLink} exact to={`/post/add`} activeClassName='active'>Add Post</Button>}
        {(isAuthenticated && value !== 'denided') && <LogoutButton />}
        {(!isAuthenticated) && <LoginButton className={styles.login} /> }
        {isAuthenticated && <div className={styles.welcome}>Welcome {user.name}</div>}
      </nav>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  mode: PropTypes.string,
  users: PropTypes.array,
  posts: PropTypes.array,
  status: PropTypes.object,
  match: PropTypes.string,
  setStatus: PropTypes.func,
};

const mapStateToProps = state => ({
  status: globalStatus(state),
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
