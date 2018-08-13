import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

import { Col, Row, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import Modal from 'react-responsive-modal';

class NewComment extends Component {

  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.hideModal}
        little
        classNames={{
          modal: 'custom-modal',
          transitionEnter: 'transition-enter',
          transitionEnterActive: 'transition-enter-active',
          transitionExit: 'transition-exit-active',
          transitionExitActive: 'transition-exit-active',
        }}
        animationDuration={600}
        >
        <h3>Comment</h3>
        <Form horizontal>
          <FormGroup controlId="body">
            <Col componentClass={ControlLabel} sm={2}>
              Body
            </Col>
            <Col sm={10}>
              <FormControl
                style={{ height: 400, resize: 'vertical' }}
                componentClass="textarea"
                placeholder="Enter body"
                value={this.props.body}
                onChange={(e) => this.props.changeBody(e)}
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
                value={this.props.author}
                onChange={(e) => this.props.changeAuthor(e)}
              />
            </Col>
          </FormGroup>
        </Form>
        <Form inline onSubmit={ this.props.control ? this.props.onUpdateComment : this.props.onSubmitComment}>
          <Row justify="space-around">
            <Col smOffset={9} sm={3}>
              <Button type="submit">Submit</Button>
              <Button style={{ marginLeft: 10 }} type="button" onClick={() => this.props.controlModalAndEdit()}>Cancel</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  open: state.comments.open,
  control: state.comments.control,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
