import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { globalStatus } from '../../../redux/statusRedux';
import {  getAll, editSinglePost, addNewAdvert } from '../../../redux/postsRedux';
import styles from './PostAdd.module.scss';
import Button from '@material-ui/core/Button';

class Component extends React.Component {

  state = {
    id: '',
    email: '',
    textarea: '',
    accept: false,
    message: '',
    published: 'published',
    edited: 'edited',
    title: '',
    // image: '',
    errors: {
      title: false,
      email: false,
      textarea: false,
      accept: false,
    },
  }

  messages = {
    input_incorrect: 'In order to proceed, please follow the guidelines provided',
    accept_incorrect: 'Please agree',
  }

  setImage = ({ target }) => {
    // console.log(target)
    const { post } = this.state;
    const file = target.files;
    if (file) this.setState({ post: { ...post, image: file[0] } });
  };


  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    if (type === 'text' || type === 'textarea' || type === 'email') {

      const value = e.target.value;
      this.setState({
        [name]: value,
      });
    } else if (type === 'checkbox') {
      const checked = e.target.checked;
      this.setState({
        [name]: checked,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const validation = this.formValidation();

    if (validation.correct) {
      if (!this.props.mode) {
        this.props.addPost({
          // id: Math.floor(Math.random() * (1000 - 1 + 1) + 1),
          // user: 'logged user',
          author: this.state.email,
          title: this.state.title,
          text: this.state.textarea,
          created: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' '),
          status: this.state.published,
          updated: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' '),
          // image: this.state.image,
        });
      }
      if (this.props.mode === 'edit') {
        this.props.editPost({
          id: this.state.id,
          user: 'logged user',
          email: this.state.email,
          title: this.state.title,
          text: this.state.textarea,
          updated: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' '),
          status: this.state.edited,
          // image: this.state.image,
        });
      }
      this.setState({
        id: '',
        title: '',
        email: '',
        textarea: '',
        accept: false,
        message: 'Advert has been posted',
        // image: '',
        errors: {
          title: false,
          email: false,
          textarea: false,
          accept: false,
        },
      });
    } else {
      this.setState({
        errors: {
          title: !validation.title,
          email: !validation.email,
          textarea: !validation.textarea,
          accept: !validation.accept,
        },
      });
    }
  }

  formValidation() {
    // true - ok
    // false - zle
    let title = false;
    let email = false;
    let textarea = false;
    let accept = false;
    let correct = false;

    if (this.state.title.length > 10) {
      title = true;
    }

    if (this.state.email.indexOf('@') !== -1) {
      email = true;
    }

    if (this.state.textarea.length > 20) {
      textarea = true;
    }

    if (this.state.accept) {
      accept = true;
    }

    if (title && email && textarea && accept) {
      correct = true;
    }

    return ({
      correct,
      title,
      email,
      textarea,
      accept,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      id: '',
      email: '',
      textarea: '',
      title: '',
      // image: '',
    });
  }

  componentDidMount() {

    if (this.props.mode === 'edit') {
      const url = `${this.props.match.params.id}/edit`.slice(0, `${this.props.match.params.id}/edit`.lastIndexOf('/'));

      for (const post of this.props.posts) {
        if (post['title'] === url) {
          this.setState({
            id: post.id,
            email: post.author,
            textarea: post.text,
            title: post.title,
            // image: post.image,
          });
        }
      }
    }
  }

  componentDidUpdate() {

    if (this.state.message !== '') {
      setTimeout(() => this.setState({
        message: '',
      }), 1000);
    }
  }

  // setImage = ({ target }) => {
  //   console.log(target.files)
  //   const { post } = this.state;
  //   const file = target.files;
  //   if (file) this.setState({ post: { ...post, image: file[0] } });
  // };

  render() {
    const { mode } = this.props;
    const { className, status } = this.props;

    return (
      <Card className={clsx(className, styles.root)}>
        <input
         
          accept="image/*"
          className={styles.input}
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          onChange={this.setImage}
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button style={{ display: 'none' }} variant="outlined" component="span" className={styles.button}>
            Upload
          </Button>
        </label>
        { (status.globalStatus === 'granted' || status.globalStatus === 'admin') && <form onSubmit={this.handleSubmit} noValidate>
          <TextField className={styles.input} placeholder="Correct email including @" type="email" id="user" name="email" value={this.state.email} onChange={this.handleChange} label="Your email:" variant="outlined" />
          <TextField className={styles.input} placeholder="Minimum 10 digits" type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} label="Title" variant="outlined" />
          <TextField className={styles.input} placeholder="Minimum 20 digits" type="textarea" name="textarea" id="textarea" cols="10" rows="6" value={this.state.textarea} onChange={this.handleChange}
            multiline
            variant="outlined"
            label="Your Advert:"
          />
          <label htmlFor="accept">
            <input type="checkbox" id="accept" name="accept" checked={this.state.accept} onChange={this.handleChange} /> I agree to use my private email.
          </label>
          {(this.state.errors.title || this.state.errors.email || this.state.errors.textarea) && <span>{this.messages.input_incorrect}</span>}
          {this.state.errors.accept && <span>{this.messages.accept_incorrect}</span>}
          <button>{mode === 'edit' ? 'Edit Note' : 'Add Note'}</button>
        </form>}
        {this.state.message && <h3>{this.state.message}</h3>}
      </Card>
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
  addPost: PropTypes.func,
  editPost: PropTypes.func,
  addNewAdvert: PropTypes.func,
};

const mapStateToProps = state => ({
  status: globalStatus(state),
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  // addPost: newPost => dispatch(addNewPost(newPost)),
  editPost: edited => dispatch(editSinglePost(edited)),
  addPost: newPost => dispatch(addNewAdvert(newPost)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostAdd,
  Component as PostAddComponent,
};
