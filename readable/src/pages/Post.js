import React, { Component } from 'react';

import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import { Grid, Col, Panel, Row } from 'react-bootstrap';
import moment from 'moment';

import FadeIn from 'react-fade-in';

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Comment from './Comment';
import NewComment from './NewComment';

class Post extends Component {

  state = {
    idPost: '',
    idComment: '',
    idCommentDeleted: '',
    body: '',
    author: '',
    width: window.innerWidth,
  }

  componentWillMount() {

    const { post_id } = this.props.match.params;
    this.props.controlOpenModal(false);
    this.props.getPostId(post_id);
    this.props.getAllComments(post_id);
  }

  updateDimensions = () => {
    this.setState({width:window.innerWidth});
  }

  componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", () => {this.updateDimensions()});
  }

  removePost = (id) => {
    this.setState({ idPost: id });
    setTimeout(() => {
      this.props.removePostId(id);
      this.props.history.push('/')
    }, 650)
  }

  openEditPost = () => {
    this.props.controlEditPost(true)
    return this.props.history.push('/newPost')
  }

  openEditComment = (id) => {

    this.props.controlOpenModal(true);
    this.props.controlEditComment(true);

    this.setState({ idComment: id })

    this.props.comments.map(c => {
      if(c.id === id) {
        this.setState({ body: c.body, author: c.author })
      }
      return null
    })
  }

  controlModalAndEdit = () => {
    this.props.controlOpenModal(false)
    this.props.controlEditComment(false)

    this.setState({ body: '' })
    this.setState({ author: '' })
  }

  onUpdateComment = (e) => {

    e.preventDefault();

    const comment = {
      body: this.state.body,
      author: this.state.author,
    }

    this.props.editAndSaveComment(comment, this.state.idComment)
    this.props.getAllComments(this.props.post.id)
    this.props.controlOpenModal(false)
    this.props.controlEditComment(false)

    this.setState({ body: '' })
    this.setState({ author: '' })
  }

  removeComment = (id) => {
    this.setState({ idCommentDeleted: id });
    setTimeout(() => {
      this.props.removeCommentId(id)
    }, 650)
    setTimeout(() => {
      this.props.getPostId(this.props.post.id)
    }, 700)
  }

  onSubmitComment = (e) => {

    e.preventDefault();

    const comment = {
      id: (Math.random() * 1000).toString(16),
      parentId: this.props.post.id,
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
    }

    this.props.addAndSaveComment(comment)
    this.props.controlOpenModal(false)
    this.props.controlEditComment(false)
    setTimeout(() => {
      this.props.getPostId(this.props.post.id)
    }, 50)

    this.setState({ body: '' })
    this.setState({ author: '' })
  }

  voteScorePostUp = (id) => {
    const option = 'upVote'
    this.props.voteScorePost(id, option)
  }

  voteScorePostDown = (id) => {
    const option = 'downVote'
    this.props.voteScorePost(id, option)
  }

  handleChangeBody = (e) => {
    this.setState({ body: e.target.value })
  }

  handleChangeAuthor = (e) => {
    this.setState({ author: e.target.value })
  }

  getDate = (timestamp) => {
    const date = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
    return date;
  }

  openModal = () => {
    this.props.controlOpenModal(true)
  };

  hideModal = () => {
    this.props.controlOpenModal(false)
    this.props.controlEditComment(false)
  };

  render() {
    const { id, title, body, author, timestamp } = this.props.post
    if(!id) {
      return <h3 style={{ textAlign: 'center' }}>404 Not Found</h3>
    }
    return(
      <div className="content">
        <div className={this.state.idPost === id ? "animated fadeOutRight" : ""}>
          <FadeIn>
            <Grid>
              <Col xs={12} sm={12} md={9} lg={9}>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title>
                      <Row>
                        <Col xs={10} md={10}>
                          <h6>{title}</h6>
                        </Col>
                        <Col xs={1} md={1}>
                          <IconButton
                            onClick={() => this.openEditPost()}
                          >
                            <FontIcon className="fa fa-edit" />
                          </IconButton>
                        </Col>
                        <Col xs={1} md={1}>
                          <IconButton
                            onClick={() => this.removePost(id)}
                          >
                            <FontIcon className="fa fa-trash" />
                          </IconButton>
                        </Col>
                      </Row>
                    </Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    {body}
                    <hr />
                    Author: {author} | created at: {this.getDate(timestamp)}
                  </Panel.Body>
                  <Panel.Footer>
                    <Col xs={5}>
                      <p style={{ fontSize: 20, verticalAlign: 'middle' }}>{this.props.post.commentCount} Comments</p>
                    </Col>
                    <Col xsOffset={11}>
                      <IconButton onClick={() => this.voteScorePostUp(this.props.post.id)} style={{ marginBottom: -20 }} tooltip="vote Up" tooltipPosition="top-center">
                        <FontIcon className="fa fa-sort-up" />
                      </IconButton>
                    <p style={{ fontSize: 27, marginTop: -10, marginBottom: -3, marginRight: this.state.width <= 1199 ? 5 : 18, textAlign: 'center' }}>{this.props.post.voteScore}</p>
                      <IconButton onClick={() => this.voteScorePostDown(this.props.post.id)} style={{ marginTop: -20}} tooltip="vote Down" tooltipPosition="bottom-center">
                        <FontIcon className="fa fa-sort-down" />
                      </IconButton>
                    </Col>
                  </Panel.Footer>
                </Panel>
              </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  {this.props.comments.length > 0 ? <h5>Comentários</h5> : null}
                  <FlatButton
                    label="New Comment"
                    labelPosition="before"
                    primary={true}
                    icon={<FontIcon className="fa fa-plus" />}
                    onClick={this.openModal}
                  >
                  </FlatButton>
                </Col>
              <NewComment
              hideModal={() => this.hideModal()}
              onSubmitComment={(e) => this.onSubmitComment(e)}
              onUpdateComment={(e) => this.onUpdateComment(e)}
              controlModalAndEdit={() => this.controlModalAndEdit()}
              changeBody={(e) => this.handleChangeBody(e)}
              changeAuthor={(e) => this.handleChangeAuthor(e)}
              body={this.state.body}
              author={this.state.author}
              />
            </Grid>
          </FadeIn>
          <br />
          {this.props.comments.map(comment =>
            <Comment
              key={comment.id}
              comment={comment}
              openEditComment={(id) => this.openEditComment(id)}
              removeComment={(id) => this.removeComment(id)}
              idCommentDeleted={this.state.idCommentDeleted}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.posts.post,
  comments: state.comments.comments.slice().sort((a,b) =>
    b.voteScore - a.voteScore),
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Post);