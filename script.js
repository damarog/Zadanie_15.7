class Stopwatch extends React.Component {
	constructor() {
		super();
		this.state = {
			running: false
		};
		this.reset();
		this.print(this.times);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.restart = this.restart.bind(this);	
	}

	reset() {
		this.times = {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		};
	}

	print() {
		return true;
	}

	format(times) {
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
		if (!this.state.running) {
			this.state.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step() {
		if (!this.state.running) return;
		this.calculate();
		this.print();		
	}

	calculate() {
		this.times.miliseconds += 1;
		if (this.times.miliseconds >= 100) {
			this.times.seconds += 1;
			this.times.miliseconds = 0
		}
		if (this.times.seconds >= 60) {
			this.times.minutes += 1;
			this.times.seconds = 0;
		}
		this.forceUpdate();
	}

	stop() {
		this.state.running = false;
		clearInterval(this.watch);
	}

	restart() {
		if (this.state.running === false) {
			this.reset();
			this.print(this.times);
		};
		this.forceUpdate();
	}

	render() {
		return (
			<div className='stoper-back'>
				<nav className='controls'>
					<a href="#" className='button' id='start' onClick={this.start}>Start</a>
					<a href="#" className='button' id='stop' onClick={this.stop}> Stop</a>
					<a href="#" className='button' id='reset' onClick={this.restart}> Reset</a>
				</nav>				
				<div className='stopwatch'>{this.format(this.times)}</div>
				<ul className='result' id='resultBoard'></ul>	
			</div>
		);
	}
}

function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

ReactDOM.render(
	<Stopwatch />,
	document.getElementById('stoper')
);

