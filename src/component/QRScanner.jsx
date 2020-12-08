import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import './style/qrStyle.css';
import { API_BASE } from '../Constant';
import { Typography } from '@material-ui/core';
import history from '../history';

class ScannerQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 1000,
      result: 'No result',
      facingMode: 'rear',
    };
    this.handleScan = this.handleScan.bind(this);
  }
  handleTokenValidation(data, jsonData) {
    debugger;
    if (data.token) {
      // history.push(data.replace('https://mastarqr.com/', ''));
      history.push(
        jsonData.company_id +
          '?table_no=' +
          jsonData.table_no +
          '&expire=' +
          data.scan_cooldown +
          '&token=' +
          data.token,
      );
    } else {
      this.setState({
        waitMessage: 'Please try after a while. Another order is being processed...',
      });
    }
  }

  handleScan(data) {
    const jsonData = JSON.parse(data);
    if (data) {
      this.setState({
        result: data,
      });
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asset: jsonData.table_no }),
      };
      fetch(API_BASE + 'order/validate-qr-scan/', requestOptions)
        .then(response => response.json())
        .then(data => this.handleTokenValidation(data, jsonData));
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
    const { waitMessage } = this.state;
    const previewStyle = {
      height: 300,
      width: 300,
      position: 'relative',
      borderStyle: 'solid',
      borderColor: 'red',
    };
    const messageStyle = {
      color: 'red',
      fontSize: '15pt',
    };
    return (
      <>
        {/* <Typography
          style={{ color: '#00e6ff', fontSize: '15pt', textAlign: 'center' }}
          onClick={() => this.handleCameraSwitch()}
        >
          Switch Camera
        </Typography> */}
        <QrReader
          className="qrReader"
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={!waitMessage ? this.handleScan : () => {}}
          // facingMode={this.state.facingMode}
        />
        {waitMessage && <p style={messageStyle}>{waitMessage}</p>}
      </>
    );
  }
}

export default ScannerQR;
