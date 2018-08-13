import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FadeIn from 'react-fade-in';

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';

import { Grid, Row, Col } from 'react-bootstrap';
import StatsCard from '../components/StatsCard/StatsCard';

class Categories extends Component {

  componentWillMount() {
    this.props.controlEditPost(false);
  }

  render() {
    return (
      <div className="content" >
        <FadeIn>
          <Grid>
            <Row>
              {this.props.categories && this.props.categories.map(category => (
                  <Col key={category.name} xs={12} sm={12} md={9} lg={10}>
                    <Link
                      to={category.name}
                    >
                      <StatsCard
                        statsText="Category"
                        statsValue={category.name}
                      />
                    </Link>
                  </Col>
              ))}
            </Row>
          </Grid>
        </FadeIn>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

