import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { globalStatus } from '../../../redux/statusRedux';
import { getAll, editSingledAdvert, addNewAdvert } from '../../../redux/postsRedux';
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
    photo: '',
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

  handleChange = ({ target }) => {
    const name = target.name;
    const type = target.type;
    let file = target.files;
    if (file) {
      // this.setState({ photo: URL.createObjectURL(target.files[0])});
      this.setState({ photo: file[0].name });
    }
    if (type === 'text' || type === 'textarea' || type === 'email') {

      const value = target.value;
      this.setState({
        [name]: value,
      });

    } else if (type === 'checkbox') {
      const checked = target.checked;
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
          author: this.state.email,
          title: this.state.title,
          text: this.state.textarea,
          created: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' '),
          status: this.state.published,
          updated: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' '),
          photo: this.state.photo,
        });
        console.log(this.state);
      }
      if (this.props.mode === 'edit') {
        this.props.editPost({
          id: this.state.id,
          user: 'logged user',
          author: this.state.email,
          title: this.state.title,
          text: this.state.textarea,
          updated: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' '),
          status: this.state.edited,
          photo: this.state.photo,
        });
      }
      this.setState({
        id: '',
        title: '',
        email: '',
        textarea: '',
        accept: false,
        message: 'Advert has been posted',
        photo: '',
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
      photo: '',
    });
  }

  componentDidMount() {

    if (this.props.mode === 'edit') {
      const url = `${this.props.match.params.id}/edit`.slice(0, `${this.props.match.params.id}/edit`.lastIndexOf('/'));

      for (const post of this.props.posts) {
        if (post['title'] === url) {
          this.setState({
            id: post._id,
            email: post.author,
            textarea: post.text,
            title: post.title,
            photo: post.photo,
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

  render() {
    const { mode } = this.props;
    const { className, status } = this.props;

    return (
      <Card className={clsx(className, styles.root)}>
        { (status.globalStatus === 'granted' || status.globalStatus === 'admin') && <form onSubmit={this.handleSubmit} noValidate>
          <TextField className={styles.input} placeholder="Correct email including @" type="email" id="user" name="email" value={this.state.email} onChange={this.handleChange} label="Your email:" variant="outlined" />
          <TextField className={styles.input} placeholder="Minimum 10 digits" type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} label="Title" variant="outlined" />
          <TextField className={styles.input} placeholder="Minimum 20 digits" type="textarea" name="textarea" id="textarea" cols="10" rows="6" value={this.state.textarea} onChange={this.handleChange}
            multiline
            variant="outlined"
            label="Your Advert:"
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple type="file"
            onChange={this.handleChange}
          />
          <label className={styles.upload} htmlFor="raised-button-file">
            <Button  variant="outlined" component="span" className={styles.button}>
              Upload
            </Button>
          </label>
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
  editPost: edited => dispatch(editSingledAdvert(edited)),
  addPost: newPost => dispatch(addNewAdvert(newPost)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostAdd,
  Component as PostAddComponent,
};
