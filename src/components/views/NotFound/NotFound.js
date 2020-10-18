import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import styles from './NotFound.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <h2>404</h2>
    <h2>NotFound</h2>
    <Button variant="contained" color="primary" size="medium" component={Link} to={`/`}>
      Homepage
    </Button>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
