import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FadeIn from 'react-fade-in';

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Grid, Row, Col } from 'react-bootstrap';
import StatsCard from '../components/StatsCard/StatsCard';

import Posts from './Posts';

class Home extends Component {
  componentDidMount() {
    this.props.getAllPosts();
    this.props.getAllCategories();
    this.props.getAllComments();
  }

  render() {
    return (
      <div className="content">
        <FadeIn>
          <Grid>
            <Row>
              {this.props.categories &&
                this.props.categories.map(category => (
                  <Col key={category.name} xs={4} sm={4} md={3} lg={3}>
                    <Link to={category.name}>
                      <StatsCard
                        statsText="Category"
                        statsValue={category.name}
                      />
                    </Link>
                  </Col>
                ))}
            </Row>
          </Grid>
          <Posts />
        </FadeIn>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts:
    state.posts.orderBy === 'voteScore'
      ? state.posts.posts.slice().sort((a, b) => b.voteScore - a.voteScore)
      : state.posts.posts.slice().sort((a, b) => b.timestamp - a.timestamp),
  categories: state.categories.categories,
  comments: state.comments.comments,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
