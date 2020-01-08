import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';
import './JokeList.css';

export default class JokeBoard extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: false, jokes: JSON.parse(window.localStorage.getItem('jokes')) || [] };
		this.getJokes = this.getJokes.bind(this);
		this.updateScore = this.updateScore.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		if (this.state.jokes.length === 0) this.getJokes();
	}

	handleClick() {
		this.setState({ loading: true }, this.getJokes);
	}

	async getJokes() {
		try {
			let newJokes = [];
			for (let index = 0; index < 10; index++) {
				const response = await axios.get('https://icanhazdadjoke.com/slack');
				newJokes = [ ...newJokes, { id: uuid(), text: response.data.attachments[0].text, score: 0 } ];
			}
			this.setState(
				(st) => ({
					loading: false,
					jokes: [ ...st.jokes, ...newJokes ]
				}),
				() => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
			);
		} catch (error) {
			console.log('An Error Occured');
		}
	}

	updateScore(vote, id) {
		const updatedJokes = this.state.jokes.map((joke) => {
			if (joke.id === id) {
				if (vote === 'up-vote') {
					joke.score += 1;
				} else {
					joke.score -= 1;
				}
			}
			return joke;
		});
		this.setState({ jokes: updatedJokes });
	}

	render() {
		if (this.state.loading) {
			return (
				<div className="JokeList-spinner">
					<i className="far fa-8x fa-laugh fa-spin" />
					<h1 className="JokeList-title">Loading...</h1>
				</div>
			);
		}

		let jokes = this.state.jokes.sort((a, b) => b.score - a.score);
		return (
			<div className="JokeList">
				<div className="JokeList-sidebar">
					<h1 className="JokeList-title">
						<span>Dad</span> Jokes
					</h1>
					<img
						alt="fetch-button"
						src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
					/>
					<button className="JokeList-getmore" onClick={this.handleClick}>
						Fetch Jokes
					</button>
				</div>
				<div className="JokeList-jokes">
					{jokes.map((joke) => (
						<Joke
							key={joke.id}
							id={joke.id}
							joke={joke.text}
							score={joke.score}
							updateScore={this.updateScore}
						/>
					))}
				</div>
			</div>
		);
	}
}
