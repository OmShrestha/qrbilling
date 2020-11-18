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
        />
        <p style={{textAlign: 'center', color: '#fff'}}>{this.state.result}</p>
        <div style={{display: 'flex', flexDirection: 'column',padding: '25px'}}>
          <button style={{background: '#FFFFFF 0% 0% no-repeat padding-box',border: '1px solid #707070',borderRadius: '25px',opacity: 1,padding: '7px 10px',margin: '5px 0', fontSize: '14px'}}>Normal Flow</button>
          <button style={{background: '#FFFFFF 0% 0% no-repeat padding-box',border: '1px solid #707070',borderRadius: '25px',opacity: 1,padding: '7px 10px',margin: '5px 0', fontSize: '14px'}}>Apply Discount Flow</button>
          <button style={{background: '#FFFFFF 0% 0% no-repeat padding-box',border: '1px solid #707070',borderRadius: '25px',opacity: 1,padding: '7px 10px',margin: '5px 0', fontSize: '14px'}}>Add item to existing order Flow</button>
        </div>
      </div>
    );
  }
}

export default ScannerQR;
