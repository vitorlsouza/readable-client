import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

import FadeIn from 'react-fade-in';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import { Grid, Col, Panel, Row } from 'react-bootstrap';

class Comment extends Component {

  state = {
    width: window.innerWidth,
  }

  updateDimensions = () => {
    this.setState({width:window.innerWidth});
  }

  componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", () => {this.updateDimensions()});
  }

  voteScoreCommentUp = (id) => {
    const option = 'upVote'
    this.props.voteScoreComment(id, option)
    setTimeout(() => {
      this.props.getAllComments(this.props.comment.parentId);
    }, 50)
  }

  voteScoreCommentDown = (id) => {
    const option = 'downVote'
    this.props.voteScoreComment(id, option)
    setTimeout(() => {
      this.props.getAllComments(this.props.comment.parentId);
    }, 50)
  }

  render() {
    return(
      <div className={this.props.idCommentDeleted === this.props.comment.id ? "animated fadeOutRight" : ""}>
        <FadeIn>
          <Grid>
            <Col xs={12} sm={12} md={9} lg={9}>
              <Panel>
                <Panel.Body>
                  <Row>
                    <Col xs={10} md={10}>
                    {this.props.comment.body}
                    </Col>
                    <Col xs={1} md={1}>
                      <IconButton
                        onClick={(id) => this.props.openEditComment(this.props.comment.id)}
                      >
                        <FontIcon className="fa fa-edit" />
                      </IconButton>
                    </Col>
                    <Col xs={1} md={1}>
                      <IconButton
                        onClick={() => this.props.removeComment(this.props.comment.id)}
                      >
                        <FontIcon className="fa fa-trash" />
                      </IconButton>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col xs={6}>
                    Author: {this.props.comment.author}
                    </Col>
                    <Col xsOffset={11}>
                      <IconButton onClick={() => this.voteScoreCommentUp(this.props.comment.id)} iconStyle={{ fontSize: 18 }} style={{ marginBottom: -20, width: 30, height: 30, padding: 5 }} tooltip="vote Up" tooltipPosition="top-center">
                        <FontIcon className="fa fa-sort-up"/>
                      </IconButton>
                      <p style={{ marginTop: -10, marginBottom: -8, textAlign: 'center', marginRight: this.state.width <= 1199 ? 25 : 37 }}>{this.props.comment.voteScore}</p>
                      <IconButton onClick={() => this.voteScoreCommentDown(this.props.comment.id)} iconStyle={{ fontSize: 18}} style={{ marginTop: -20, width: 30, height: 30, padding: 5 }} tooltip="vote Down" tooltipPosition="bottom-center">
                        <FontIcon className="fa fa-sort-down"/>
                      </IconButton>
                    </Col>
                  </Row>
                </Panel.Body>
              </Panel>
            </Col>
          </Grid>
        </FadeIn>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect (null, mapDispatchToProps)(Comment);