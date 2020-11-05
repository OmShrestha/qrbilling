import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';

class ScannerQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: 'No result',
    };
    this.handleScan = this.handleScan.bind(this);
  }
  handleScan(data) {
    if (data) {
      this.setState({
        result: data,
      });
      const jsonData = JSON.parse(data);
      window.location.assign('http://localhost:3000/' + jsonData.company_id + '?table_no=' + jsonData.table_no);
    }
  }
  handleError(err) {
    console.error(err);
  }
  render() {
    const previewStyle = {
      height: '50%',
      width: '50%',
      position: 'relative',
    };

    return (
      <div>
        <QrReader
          className="center"
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default ScannerQR;
