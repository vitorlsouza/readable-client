import React, { Component } from 'react';

import { Form, FormGroup, FormControl, ControlLabel, Grid, Col, Button } from 'react-bootstrap';

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';

class NewPost extends Component {

  state = {
      title: '',
      body: '',
      author: '',
      select: '',
  }

  componentWillMount() {
    if (this.props.control) {
      const { title, body, author, category } = this.props.post;
      this.setState({ title, body, author, select: category })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      id: (Math.random() * 1000).toString(16),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.select,
    }

    this.props.addAndSavePost(post);

    this.props.history.push('/');
  }

  handleUpdate = (e) => {
    e.preventDefault();

    const id = this.props.post.id;

    const post = {
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.select,
    }

    this.props.editAndSavePost(post, id);

    this.props.history.push('/');
    this.props.getAllPosts();
  }

  handleChangeTitle = (e) => {
    this.setState({ title : e.target.value })
  }

  handleChangeBody = (e) => {
    this.setState({ body: e.target.value })
  }

  handleChangeAuthor = (e) => {
    this.setState({ author: e.target.value })
  }

  handleChangeSelect = (e) => {
    this.setState({ select: e.target.value })
  }

  render() {
    return (
      <div className="content">
        <Grid>
          <Col xs={8} sm={8} md={8} lg={8}>
            <Form horizontal onSubmit={this.props.control ? this.handleUpdate : this.handleSubmit }>
              <FormGroup controlId="email">
                <Col componentClass={ControlLabel} sm={2}>
                  Title
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="Enter title"
                    value={this.state.title}
                    onChange={(e) => this.handleChangeTitle(e)}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="body">
                <Col componentClass={ControlLabel} sm={2}>
                  Body
                </Col>
                <Col sm={10}>
                  <FormControl
                    style={{ height: 200, resize: 'vertical' }}
                    componentClass="textarea"
                    placeholder="Enter body"
                    value={this.state.body}
                    onChange={(e) => this.handleChangeBody(e)}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="author">
                <Col componentClass={ControlLabel} sm={2}>
                  Author
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="Enter author"
                    value={this.state.author}
                    onChange={(e) => this.handleChangeAuthor(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Col componentClass={ControlLabel} sm={2}>
                  <ControlLabel>Category</ControlLabel>
                </Col>
                <Col sm={10}>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    value={this.state.select}
                    onChange={(e) => {this.handleChangeSelect(e)}}
                  >
                    <option value="select">select category</option>
                    <option value="react">react</option>
                    <option value="redux">redux</option>
                    <option value="udacity">udacity</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.post,
  control: state.posts.control,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);

