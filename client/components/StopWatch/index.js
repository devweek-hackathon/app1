import React, {Component, PropTypes} from 'react'
import { Button } from 'semantic-ui-react';

class StopWatch extends Component {
  state = {
    running: false,
    lapse: 0,
  }

  _now = 0
  _timer = null

  handleRunClick = () => {
    if (this.state.running) {
      this.stop()
    } else {
      this.start()
    }
  }

  handleClearClick = () => {
    this.stop()
    this._now = 0
    this.setState({lapse: 0})
  }

  start() {
    this._timer = setInterval(() => {
      this.setState({
        lapse: Date.now() - this._now,
      })
    }, 1)

    this._now = Date.now() - this.state.lapse
    this.setState({running: true})
  }

  stop() {
    clearInterval(this._timer)
    this._timer = null
    this.setState({running: false})
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <label style={{fontSize: '20px', display: 'block'}} data-test="s">{this.state.lapse}s</label>
        <Button onClick={this.handleRunClick} data-test="toggle">{this.state.running ? 'Stop' : 'Start'}</Button>
        <Button  onClick={this.handleClearClick} data-test="clear">Clear Timer</Button>
      </div>
    )
  }
}

export default StopWatch
