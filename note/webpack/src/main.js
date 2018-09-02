import React from "react";
import ReactDOM from "react-dom";
import Demo from './component'
// import 'antd/dist/antd.css';
import 'antd/dist/antd.less';


class Index extends React.Component {
  render() {
    return (
      <div>
        <Demo /> 
        { /* <img src="common/img/new.jpg" /> */ } 
        <Button type="primary">Hello</Button>
      </div>
    )
  }
}

ReactDOM.render(<Index /> , document.getElementById("root"));