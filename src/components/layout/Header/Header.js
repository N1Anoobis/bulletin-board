import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { getUsers } from '../../../redux/usersRedux';
// imp
import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

class Component extends React.Component {

  state = {
    status: 'denided',
  }

  handleChange = event => {
    this.setState({
      status: event.target.value,
    });
  };

  render() {
    const { className, children, users } = this.props;
    const { status } = this.state;
    return (
      <div className={clsx(className, styles.root)}>
        <nav>
          <select onChange={this.handleChange} className={styles.select}>
            {users.map(user => {
              return (
                <option key={user.id} value={user.status}>{user.name}</option>
              );
            })}
          </select>
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
  // someAction: arg => dispatch(reduxActionCreator(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Header,
  Component as HeaderComponent,
};
