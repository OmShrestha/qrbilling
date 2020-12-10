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
  handleTokenValidation(tokenResponse, url) {
    if (tokenResponse.token) {
      let newUrl = url.replace('https://mastarqr.com/', '');
      history.push(newUrl + '&expire=' + tokenResponse.scan_cooldown + '&token=' + tokenResponse.token);
    } else {
      this.setState({
        waitMessage: 'Please try after a while. Another order is being processed...',
      });
    }
  }
  getParameters(url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  }

  handleScan(url) {
    // let newData =
    //   'https://mastarqr.com/56221fc3-dece-45b3-b2bd-cc2343702d1c?table_no=7e3f1595-d659-49f2-93f4-45b8d0a39366';
    const jsonData = this.getParameters(url);
    if (url) {
      this.setState({
        result: url,
      });
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asset: jsonData.table_no }),
      };
      fetch(API_BASE + 'order/validate-qr-scan/', requestOptions)
        .then(response => response.json())
        .then(tokenResponse => this.handleTokenValidation(tokenResponse, url));
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
