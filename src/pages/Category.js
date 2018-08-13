import React, { Component } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import gifLoading from '../assets/img/loading.svg';

import FadeIn from 'react-fade-in';

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';

class Category extends Component {
  state = {
    width: window.innerWidth,
    loading: false,
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', () => {
      this.updateDimensions();
    });

    this.updateCategories();

    this.props.controlEditPost(false);
  }

  updateCategories = () => {
    this.setState({ loading: true });
    this.props.getPostByCategory(this.props.location.pathname).then(() => {
      this.setState({ loading: false });
    });
  };

  voteScorePostUp = id => {
    const option = 'upVote';
    this.props.voteScorePost(id, option);
    setTimeout(() => {
      this.props.getPostByCategory(this.props.location.pathname);
    }, 50);
  };

  voteScorePostDown = id => {
    const option = 'downVote';
    this.props.voteScorePost(id, option);
    setTimeout(() => {
      this.props.getPostByCategory(this.props.location.pathname);
    }, 50);
  };

  render() {
    {
      if (this.state.loading)
        return (
          <div className="loading">
            <img src={gifLoading} className="gif" alt="gif loading" />
          </div>
        );
      return (
        <div className="content">
          {this.state.loading ? (
            <img src={gifLoading} alt="gif loading" />
          ) : (
            <FadeIn>
              <Grid>
                {this.props.postsCategory.map(post => (
                  <Row key={post.id}>
                    <Col xs={12} sm={12} md={9} lg={9}>
                      <Panel>
                        <Panel.Heading>
                          <Panel.Title>
                            <Row>
                              <Col xs={10} md={10}>
                                {post.title}
                              </Col>
                              <Col xs={2} md={2}>
                                <Link to={`${post.category}/${post.id}`}>
                                  Details
                                </Link>
                              </Col>
                            </Row>
                          </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>{post.body}</Panel.Body>
                        <Panel.Footer>
                          <Col xs={5}>
                            <p
                              style={{ fontSize: 20, verticalAlign: 'middle' }}
                            >
                              {post.commentCount} Comments
                            </p>
                          </Col>
                          <Col xsOffset={11}>
                            <IconButton
                              onClick={() => this.voteScorePostUp(post.id)}
                              style={{ marginBottom: -20 }}
                              tooltip="vote Up"
                              tooltipPosition="top-center"
                            >
                              <FontIcon className="fa fa-sort-up" />
                            </IconButton>
                            <p
                              style={{
                                fontSize: 27,
                                marginTop: -10,
                                marginBottom: -3,
                                marginRight: this.state.width <= 1199 ? 6 : 20,
                                textAlign: 'center',
                              }}
                            >
                              {post.voteScore}
                            </p>
                            <IconButton
                              onClick={() => this.voteScorePostDown(post.id)}
                              style={{ marginTop: -20 }}
                              tooltip="vote Down"
                              tooltipPosition="bottom-center"
                            >
                              <FontIcon className="fa fa-sort-down" />
                            </IconButton>
                          </Col>
                        </Panel.Footer>
                      </Panel>
                    </Col>
                  </Row>
                ))}
              </Grid>
            </FadeIn>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  postsCategory:
    state.categories.orderBy === 'voteScore'
      ? state.categories.postsCategory
          .slice()
          .sort((a, b) => b.voteScore - a.voteScore)
      : state.categories.postsCategory
          .slice()
          .sort((a, b) => b.timestamp - a.timestamp),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Category);
