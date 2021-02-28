import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: props.time };
  }

  tick() {
    if (this.state.seconds !== 0) {
      this.setState((state) => ({
        seconds: state.seconds - 1,
      }));
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div style={{ backgroundColor: "#266d7d", color: "white" }}>
        {this.state.seconds > 0 ? (
          <h5>
            Order time expire in <b>{this.state.seconds}</b> seconds
          </h5>
        ) : (
          <>
            <h6>Order time expired. Please order again !!!</h6>
            {/* <button style={{ backgroundColor: '#4EA23A', color: 'white' }} onClick={() => window.location.reload()}>
              Order Again
            </button> */}
          </>
        )}
      </div>
    );
  }
}

export default Timer;
