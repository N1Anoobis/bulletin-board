import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/postsRedux';
import { getUsers } from '../../../redux/userReducer';
import styles from './Homepage.module.scss';
import { globalStatus } from '../../../redux/statusRedux';

class Component extends React.Component {

  componentDidMount() {
    const { fetchPublishedPosts } = this.props;
    fetchPublishedPosts();
  }

  render() {
    const { className, mode, users, status } = this.props;
    let { posts } = this.props;
    if (mode === 'myAdds') {
      let filterPosts = posts.filter(post => (post.author === users[1].email));
      posts = filterPosts;
    }

    return (
      (status.globalStatus === 'granted' || (!mode)) && <div className={clsx(className, styles.root)}>
        {(posts) && posts.map((post) => (
          <Card className={styles.card} key={post._id} variant="outlined">
            <CardActionArea props={post} component={Link} to={`/post/${post._id}`}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  mode: PropTypes.string,
  users: PropTypes.array,
  posts: PropTypes.array,
  status: PropTypes.object,
  fetchPublishedPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  users: getUsers(state),
  status: globalStatus(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Homepage,
  Component as HomepageComponent,
};
