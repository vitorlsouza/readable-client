import React, {Component} from 'react';
import { Nav, NavDropdown, MenuItem } from 'react-bootstrap';

/* Redux */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';


class HeaderLinks extends Component{

	handleSelectOrder = (event) => {
		this.props.setOrderBy(event);
	}

	render(){
		return (
			<div>
				<Nav pullRight onSelect={ event => this.handleSelectOrder(event)}>
					<NavDropdown eventKey={'orderBy'} title="Order By" id="basic-nav-dropdown-right">
						<MenuItem eventKey={'voteScore'}>Vote Score</MenuItem>
						<MenuItem eventKey={'DateOfCreation'}>Date of Creation</MenuItem>
					</NavDropdown>
				</Nav>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	orderBy: state.posts.orderBy,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLinks);
