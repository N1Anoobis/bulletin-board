import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Post } from '../Post/Post';
import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import styles from './Homepage.module.scss';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

const Component = ({className, children, posts}) => (
  <div className={clsx(className, styles.root)}>
    {posts.map((post) => (
            <Card className={styles.card} key={post.date} variant="outlined">
              <CardActionArea props={post} component={Link} to={`/post/${post.title}`}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  {/* <Post {...post} /> */}
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};
