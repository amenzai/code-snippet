'use strict';
import React from "react";
import qq from "./common/img/new.jpg";
import { Button } from 'antd';
// import './common/less/app.less';
import './common/less/app.css';
export default class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '测试react'
    }
  }
  render() {

    return (
      <div>
        <h1>{this.state.title}</h1>
        <img src={qq} />
        <p></p>
        <Button type="primary">123</Button>
      </div>
    )
  }
}