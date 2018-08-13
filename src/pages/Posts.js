import React, { Component } from 'react';

import FadeIn from 'react-fade-in';

import { Link, withRouter } from 'react-router-dom';

import moment from 'moment';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';

import { Grid, Row, Col, Panel } from 'react-bootstrap';

class Posts extends Component {

  state= {
    width: window.innerWidth,
    idPost: '',
  }

  componentWillMount() {
    this.props.controlEditPost(false);
  }

  updateDimensions = () => {
    this.setState({width:window.innerWidth});
  }

  componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", () => {this.updateDimensions()});
  }

  voteScorePostUp = (id) => {
    const option = 'upVote'
    this.props.voteScorePost(id, option)
    setTimeout(() => {
      this.props.getAllPosts();
    }, 50)
  }

  voteScorePostDown = (id) => {
    const option = 'downVote'
    this.props.voteScorePost(id, option)
    setTimeout(() => {
      this.props.getAllPosts();
    }, 50)
  }

  setPostId = (id) => {
    this.props.getPostId(id)
    this.props.getAllComments(id)
  }

  getDate = (timestamp) => {
    const date = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
    return date;
  }

  openEditPost = (id) => {
    this.props.controlEditPost(true)
    this.props.getPostId(id)
    setTimeout(() => {
      this.props.history.push('/newPost')
    }, 500)
  }

  removePost = (id) => {
    this.setState({ idPost: id });
    setTimeout(() => {
      this.props.removePostId(id);
    }, 650)
  }

  render() {
    return (
      <div className="content">
        <FadeIn>
          <Grid>
            {this.props.posts && this.props.posts.map(post => (
              <div key={post.id} className={this.state.idPost === post.id ? "animated fadeOutRight" : ""}>
                <Row>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <Panel>
                    <Panel.Heading>
                      <Panel.Title>
                        <Row style={{ display: 'flex', alignItems: 'center'}}>
                          <Col xs={8} md={8}>
                            <p>{post.title}</p>
                          </Col>
                          <Col xs={2} md={2}>
                            <Link
                              to={`${post.category}/${post.id}`}
                              onClick={id => this.setPostId(post.id)}
                            >Details</Link>
                          </Col>
                          <Col xs={1} md={1}>
                            <IconButton
                              onClick={() => this.openEditPost(post.id)}
                            >
                                <FontIcon className="fa fa-edit" />
                            </IconButton>
                          </Col>
                          <Col xs={1} md={1}>
                            <IconButton
                              onClick={() => this.removePost(post.id)}
                            >
                              <FontIcon className="fa fa-trash" />
                            </IconButton>
                          </Col>
                        </Row>
                      </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                      {post.body}
                      <hr />
                      Author: {post.author} | created at: {this.getDate(post.timestamp)}
                    </Panel.Body>
                    <Panel.Footer>
                      <Col xs={5}>
                        <p style={{ fontSize: 20, verticalAlign: 'middle' }}>{post.commentCount} Comments</p>
                      </Col>
                      <Col xsOffset={11}>
                        <IconButton onClick={() => this.voteScorePostUp(post.id)} style={{ marginBottom: -20 }} tooltip="vote Up" tooltipPosition="top-center">
                          <FontIcon className="fa fa-sort-up" />
                        </IconButton>
                      <p style={{ fontSize: 27, marginTop: -10, marginBottom: -3, marginRight: this.state.width <= 1199 ? 6 : 20, textAlign: 'center' }}>{post.voteScore}</p>
                        <IconButton onClick={() => this.voteScorePostDown(post.id)} style={{ marginTop: -20}} tooltip="vote Down" tooltipPosition="bottom-center">
                          <FontIcon className="fa fa-sort-down" />
                        </IconButton>
                      </Col>
                    </Panel.Footer>
                  </Panel>
                </Col>
              </Row>
            </div>
            ))}
          </Grid>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.orderBy === 'voteScore' ? state.posts.posts.slice().sort((a,b) =>
    b.voteScore - a.voteScore)
    : state.posts.posts.slice().sort((a,b) =>
      b.timestamp - a.timestamp),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const connectedPosts = withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));

export default connectedPosts;

