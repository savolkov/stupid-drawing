import React from 'react';
import './StupidDrawing.css';
import { connect } from 'react-redux';
import DrawZone from '../DrawZone/DrawZone';
import Controls from '../Controls/Controls';
import {
  addLineAction,
  changeLineAction,
  clearCanvasAction,
  removeLineAction,
} from '../../actions/lineActions';

const mapStateToProps = (store: any) => ({
  data: store.linesState,
});

const mapDispatchToProps = {
  addLineAction,
  removeLineAction,
  changeLineAction,
  clearCanvasAction,
};

class StupidDrawing extends React.Component {
  render() {
    return (
      <div className="stupidDrawing">
        <DrawZone />
        <Controls />
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StupidDrawing);
