import React, { Component } from "react";
import QrReader from "react-qr-reader";
import "./style/qrStyle.css";
import { API_BASE } from "../Constant";
import history from "../history";

class ScannerQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 1000,
      result: "No result",
      facingMode: "rear",
    };
    this.handleScan = this.handleScan.bind(this);
  }
  handleValidation(qrResponse, url) {
    if (qrResponse) {
      let newUrl = url.replace("https://mastarqr.com/", "");
      history.push(newUrl);
    }
  }
  getParameters(url) {
    var params = {};
    var parser = document.createElement("a");
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  }

  handleScan(url) {
    const jsonData = this.getParameters(url);
    if (url) {
      this.setState({
        result: url,
      });
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ asset: jsonData.table_no }),
      };
      fetch(API_BASE + "order/validate-qr-scan/", requestOptions)
        .then((response) => response.json())
        .then((qrResponse) => this.handleValidation(qrResponse, url));
    }
  }
  handleError(err) {
    console.error(err);
  }

  handleCameraSwitch() {
    this.setState({
      facingMode: this.state.facingMode === "rear" ? "front" : "rear",
    });
  }

  render() {
    const previewStyle = {
      height: 300,
      width: 300,
      position: "relative",
      border: "5px solid #BCBCBC",
      padding: 20,
    };
    return (
      <>
        <QrReader
          className="qrReader"
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
      </>
    );
  }
}

export default ScannerQR;
