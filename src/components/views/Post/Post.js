import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { getPostById, fetchSingledPosts } from '../../../redux/postsRedux';
import { getUsers } from '../../../redux/userReducer';
import { globalStatus } from '../../../redux/statusRedux';
import Button from '@material-ui/core/Button';
import styles from './Post.module.scss';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';

class Component extends React.Component {

  componentDidMount() {

    const { getSingledPosts } = this.props;
    getSingledPosts();
  }

  render() {
    const { className } = this.props;
    this.status = this.props.status.globalStatus;
    const currentlyLoggedUser = this.props.users[1];
    const { getPost } = this.props;
    this.post = getPost;
    this.imageUrl = '//' + window.location.hostname + (window.location.hostname === 'localhost' ? ':8000/uploads/' : '/');

    return (
      <div className={clsx(className, styles.root)} >
        <Button className={styles.btn} variant="outlined" color="primary" size="medium" component={Link} to={`/`}>
          Homepage
        </Button>
        {(this.post) ? <Card >
          <CardContent>
            {((this.status === 'granted' && currentlyLoggedUser.email === this.post.author) || this.status === 'admin') && <Button variant="outlined" color="secondary" component={Link} to={`/post/${this.post._id}/edit`} >edit</Button>}
            <Typography className={styles.typo} gutterBottom variant="h5" component="h2">
              {this.post.photo && <CardMedia className={styles.photo} component="img" alt="---" image={`${this.imageUrl}${this.post.photo}`} />}
              <div className={styles.title}>{this.post.title}</div>
              <div>{this.post.text}</div>
              <div className={styles.dataAndStatus}>
                <p>
                  Status: <span className={styles.status}>{this.post.status}</span>
                </p>
              </div>
              <p>{`email: ${this.post.author}`}</p>
              <p>Latest update: {this.post.updated ? this.post.updated : this.post.created}</p>
            </Typography>
          </CardContent>
        </Card> : null}
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
  match: PropTypes.object,
  getPost: PropTypes.object,
  getSingledPosts: PropTypes.func,
  photo: PropTypes.string,
};

const mapStateToProps = state => ({
  getPost: getPostById(state),
  status: globalStatus(state),
  users: getUsers(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  getSingledPosts: () => dispatch(fetchSingledPosts(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
};
