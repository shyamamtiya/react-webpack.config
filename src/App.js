import React, { Component ,Suspense} from 'react';
import logo from './logo.svg';
import './App.scss';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import Child from './Child';
// const Child = React.lazy(() => import('./Child')); 
class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
        visible:false
    }
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        {/* <Suspense fallback={this.loading()}> */}
            <Child />
        {/* </Suspense> */}
        <Button type="danger">vsisi</Button>
      </div>
    );
  }
}

export default App;
