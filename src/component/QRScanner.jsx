import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';
import './style/qrStyle.css';
import { BASE_URL } from '../Constant';
import { Typography } from '@material-ui/core';
import history from '../history';

class ScannerQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: 'No result',
      facingMode: 'rear',
    };
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    if (data) {
      this.setState({
        result: data,
      });
      const jsonData = JSON.parse(data);
      if (jsonData.company_id && jsonData.table_no)
        history.push(jsonData.company_id + '?table_no=' + jsonData.table_no);
    }
  }
  handleError(err) {
    console.error(err);
  }

  handleCameraSwitch() {
    this.setState({
      facingMode: this.state.facingMode == 'rear' ? 'front' : 'rear',
    });
  }

  render() {
    const previewStyle = {
      height: 300,
      width: 300,
      position: 'relative',
      borderStyle: 'solid',
      borderColor: 'red',
    };
    return (
      <div>
        <Typography
          style={{ color: '#00e6ff', fontSize: '15pt', textAlign: 'center' }}
          onClick={() => this.handleCameraSwitch()}
        >
          Switch Camera
        </Typography>
        <QrReader
          resolution
          className="qrReader"
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          facingMode={this.state.facingMode}
        />
      </div>
    );
  }
}

export default ScannerQR;
