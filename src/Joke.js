import React, { Component } from 'react';

export default class Joke extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(evt) {
		this.props.updateScore(evt.target.id, this.props.id);
	}
	render() {
		return (
			<div>
				<button id="upVote" onClick={this.handleClick}>
					+
				</button>
				{this.props.score}
				<button id="downVote" onClick={this.handleClick}>
					-
				</button>
				{this.props.joke}
			</div>
		);
	}
}
