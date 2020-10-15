import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { globalStatus } from '../../../redux/statusRedux';
import { addNewPost } from '../../../redux/postsRedux';

import styles from './PostAdd.module.scss';
// import classes from '*.module.css';

class Component extends React.Component {

  state = {
    username: '',
    email: '',
    textarea: '',
    accept: false,
    message: '',

    errors: {
      username: false,
      email: false,
      textarea: false,
      accept: false,
    }
  }

  messages = {
    input_incorrect: 'In order to proceed, please follow the guidelines provided',
    // accept_incorrect: 'Please agree'
  }

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    if (type === "text" || type === "textarea" || type === "email") {
      const value = e.target.value;
      // const checked = e.target.checked;
      this.setState({
        [name]: value
      })
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const validation = this.formValidation()

    if (validation.correct) {
      this.props.addPost({
        user: this.state.username,
        email: this.state.email,
        text: this.state.textarea,
        date: new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' ')
      })

      this.setState({
        username: '',
        email: '',
        textarea: '',
        accept: false,
        message: 'Advert has been added',
        errors: {
          username: false,
          email: false,
          textarea: false,
          accept: false,
        }
      })
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          textarea: !validation.textarea,
          accept: !validation.accept
        }
      })
    }
  }

  formValidation() {
    // true - ok
    // false - zle
    let username = false;
    let email = false;
    let textarea = false;
    let accept = false;
    let correct = false;

    if (this.state.username.length > 10 && this.state.username.indexOf(' ') === -1) {
      username = true;
    }

    if (this.state.email.indexOf('@') !== -1) {
      email = true;
    }

    if (this.state.textarea.length > 20) {
      textarea = true;
    }

    if (this.state.accept) {
      accept = true
    }

    if (username && email && textarea && accept) {
      correct = true
    }

    return ({
      correct,
      username,
      email,
      textarea,
      accept
    })
  }

  componentDidUpdate() {

    if (this.state.message !== '') {
      setTimeout(() => this.setState({
        message: ''
      }), 3000)
    }
  }

  render() {
    const { className, status } = this.props;
    console.log('global', status)

    return (
      <Container className={clsx(className, styles.root)}>

        { status.globalStatus === 'granted' && <form onSubmit={this.handleSubmit} noValidate>


          <TextField className={styles.input} placeholder="Your name:" type="text" id="user" name="username" value={this.state.username} onChange={this.handleChange} label="Your name:" variant="outlined" />
          {(this.state.errors.username || this.state.errors.email || this.state.errors.textarea) && <span>{this.messages.input_incorrect}</span>}
          <TextField className={styles.input} type="text" id="user" name="username" value={this.state.email} onChange={this.handleChange} label="Your email:" variant="outlined" />
          <TextField className={styles.input} type="text" id="user" name="username" value={this.state.email} onChange={this.handleChange} label="Title" variant="outlined" />
          <TextField className={styles.input} type="textarea" name="textarea" id="textarea" cols="10" rows="6" value={this.state.textarea} onChange={this.handleChange}
            multiline
            variant="outlined"
            label="Your Advert:"
          />
          <label htmlFor="accept">
            <input type="checkbox" id="accept" name="accept" checked={this.state.accept} onChange={this.handleChange} /> I agree to use my private email.
          </label>
          {this.state.errors.accept && <span>{this.messages.accept_incorrect}</span>}
          <button>Add Note</button>
        </form>}
        {this.state.message && <h3>{this.state.message}</h3>}
      </Container>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  status: globalStatus(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: newPost => dispatch(addNewPost(newPost)),
});

const Containe = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Containe as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};
