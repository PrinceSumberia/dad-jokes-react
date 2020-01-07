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
				<button id="up-vote" onClick={this.handleClick}>
					+
				</button>
				{this.props.score}
				<button id="down-vote" onClick={this.handleClick}>
					-
				</button>
				{this.props.joke}
				{this.props.emoji}
			</div>
		);
	}
}
