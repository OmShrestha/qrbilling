import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';
import './style/qrStyle.css';
import { BASE_URL } from '../Constant';

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
      window.location.assign(BASE_URL + jsonData.company_id + '?table_no=' + jsonData.table_no);
    }
  }
  handleError(err) {
    console.error(err);
  }

  render() {
    const previewStyle = {
      height: 300,
      width: 300,
      position: 'relative',
    };

    return (
      <div>
        <QrReader
          resolution
          className="qrReader"
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          facingMode={'rear'}
        />
      </div>
    );
  }
}

export default ScannerQR;
