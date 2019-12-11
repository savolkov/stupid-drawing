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
import Coordinates from '../Coordinates/Coordinates';
import { setMousePosAction } from '../../actions/mouseActions';

class StupidDrawing extends React.Component {
  render() {
    return (
      <div className="stupidDrawing">
        <DrawZone />
        <div className="controlsZone">
          <Controls />
          <Coordinates />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: any) => ({
  lines: store.linesState,
  mouse: store.mouseState,
  groups: store.groupsState,
});

const mapDispatchToProps = {
  addLineAction,
  removeLineAction,
  changeLineAction,
  clearCanvasAction,
  setMousePosAction,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StupidDrawing);
