import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import HeaderLinks from './HeaderLinks';

import appRoutes from '../../routes/app';

class Header extends Component{
	constructor(props){
		super(props);
		this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
		this.state = {
			sidebarExists: false
		};
	}
	mobileSidebarToggle(e){
		if(this.state.sidebarExists === false){
			this.setState({
				sidebarExists : true
			});

		}
		e.preventDefault();
		document.documentElement.classList.toggle('nav-open');
		var node = document.createElement('div');
		node.id = 'bodyClick';
		node.onclick = function(){
			this.parentElement.removeChild(this);
			document.documentElement.classList.toggle('nav-open');
		};
		document.body.appendChild(node);
}
	getBrand(){
		var name;
		appRoutes.map((prop,key) => {
			if(prop.path === this.props.location.pathname) {
				switch(prop.path) {
					case '/categories' :
						name = prop.name
						break;
					case '/posts' :
						name = prop.name
						break;
					case '/newPost' :
						name = prop.name
						break;
					case '/' :
						name = prop.name
						break;
					default :
						return null
				}
			}
			return null;
		})
		if (name === undefined)
			name = 'Post';
		return name;
	}
	render(){
		return (
			<Navbar fluid>
				<Navbar.Header>
					<Navbar.Brand>
						<a>{this.getBrand()}</a>
					</Navbar.Brand>
					<Navbar.Toggle onClick={this.mobileSidebarToggle}/>
				</Navbar.Header>
				<Navbar.Collapse>
					<HeaderLinks location={this.props.location.pathname}/>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Header;
