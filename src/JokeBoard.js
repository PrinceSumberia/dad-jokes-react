import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';

export default class JokeBoard extends Component {
	constructor(props) {
		super(props);
		this.state = { jokes: [] };
		this.getJoke = this.getJoke.bind(this);
	}
	async getJoke() {
		const response = await axios.get('https://icanhazdadjoke.com/slack');
		const newJoke = response.data.attachments[0].text;
		this.setState((st) => ({
			jokes: [ ...st.jokes, { id: uuid(), text: newJoke } ]
		}));
	}
	render() {
		const jokes = this.state.jokes.map((joke) => <Joke key={joke.id} joke={joke.text} />);
		return (
			<div>
				{jokes}
				<button onClick={this.getJoke}>Dad Joke!</button>
			</div>
		);
	}
}
