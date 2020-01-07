import React, { Component } from 'react';

export default class Joke extends Component {
	render() {
		return (
			<div>
				<p>{this.props.joke}</p>
			</div>
		);
	}
}
