import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import StupidDrawing from './components/StupidDrawing/StupidDrawing';
import {addLineAction, changeLineAction, clearCanvasAction, removeLineAction} from "./actions/lineActions";

const mapStateToProps = (store: any) => ({
  data: store.linesState,
});

const mapDispatchToProps = {
  addLineAction,
  removeLineAction,
  changeLineAction,
  clearCanvasAction,
};

const App: React.FC = () => (
  <div className="App">
    <StupidDrawing />
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
