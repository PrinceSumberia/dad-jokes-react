import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';

export default class JokeBoard extends Component {
	constructor(props) {
		super(props);
		this.state = { jokes: [] };
		this.getJokes = this.getJokes.bind(this);
		this.updateScore = this.updateScore.bind(this);
		this.setEmoji = this.setEmoji.bind(this);
	}

	componentDidMount() {
		this.getJokes();
	}

	async getJokes() {
		let newJokes = [];
		for (let index = 0; index < 10; index++) {
			const response = await axios.get('https://icanhazdadjoke.com/slack');
			newJokes = [ ...newJokes, { id: uuid(), text: response.data.attachments[0].text, score: 0, emoji: '😀' } ];
		}
		this.setState((st) => ({
			jokes: [ ...st.jokes, ...newJokes ]
		}));
	}

	updateScore(vote, id) {
		const updatedJokes = this.state.jokes.map((joke) => {
			if (joke.id === id) {
				if (vote === 'up-vote') {
					joke.score += 1;
				} else {
					joke.score -= 1;
				}
				joke.emoji = this.setEmoji(joke.score);
			}
			return joke;
		});
		this.setState({ jokes: updatedJokes });
	}

	setEmoji(score) {
		console.log(score);
		let emoji;
		switch (true) {
			case score < 0:
				emoji = '🙄';
				break;
			case score > 2 && score <= 5:
				emoji = '😁';
				break;
			case score > 5 && score <= 10:
				emoji = '😅';
				break;
			case score > 10 && score <= 15:
				emoji = '😂';
				break;
			case score > 15:
				emoji = '🤣';
				break;
			default:
				emoji = '😀';
				break;
		}
		return emoji;
	}

	render() {
		const jokes = this.state.jokes.map((joke) => (
			<Joke
				key={joke.id}
				id={joke.id}
				joke={joke.text}
				score={joke.score}
				emoji={joke.emoji}
				updateScore={this.updateScore}
			/>
		));
		return (
			<div>
				{jokes}
				<button onClick={this.getJokes}>New Jokes!</button>
			</div>
		);
	}
}
