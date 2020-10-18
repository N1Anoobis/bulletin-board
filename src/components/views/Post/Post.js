import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { getUsers } from '../../../redux/userReducer';
import { globalStatus } from '../../../redux/statusRedux';
import Button from '@material-ui/core/Button';
import styles from './Post.module.scss';
import { Link } from 'react-router-dom';

class Component extends React.Component {
  render (){
    const { className } = this.props;
    this.status =  this.props.status.globalStatus
    // console.log(this.props.users[1].email)
    const currentlyLoggedUser = this.props.users[1]
  for (const post of this.props.posts) {
    if (post['title'] === this.props.match.params.id){
       return(
     <div className={clsx(className, styles.root)} >
       <Card key={post._id}>
            <CardContent> 
            {((this.status === 'granted' && currentlyLoggedUser.email === post.email)|| this.status === 'admin') && <Button variant="outlined" color="secondary" component={Link} to={`/post/${post.title}/edit`} >edit</Button>}
            <Typography gutterBottom variant="h5" component="h2">
            <div className={styles.title}>{post.title}</div>
            <div>{post.text}</div>
              <div className={styles.dataAndStatus}>
                <p>
                  Status: <span className={styles.status}>{post.status}</span>
                </p>
              </div>
                <p>Contact seller:</p>
                <p>{`email: ${post.email}`}</p>
                <p>Latest update: {post.date}</p>
              </Typography>
            </CardContent>
          </Card>
     </div>
     )
   ;}}}
  }
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  status: globalStatus(state),
  users: getUsers(state)
});

const mapDispatchToProps = dispatch => ({
  // someAction: arg => dispatch(reduxActionCreator(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Post,
  // Container as Post,
  Component as PostComponent,
};
