import React from 'react';
import './Controls.css';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import Line from '../../classes/Line';
import Point from '../../classes/Point';
import { addLineAction, clearCanvasAction } from '../../actions/lineActions';

interface Props {
  addLineAction: typeof addLineAction,
  clearCanvasAction: typeof clearCanvasAction,
}

const MyButton = styled(Button)({
  marginRight: '4px',
});

const Controls = class extends React.Component<Props> {
  cWidth: number;

  cHeight: number;

  constructor(props: Props) {
    super(props);
    this.cWidth = 0;
    this.cHeight = 0;
  }

  componentDidMount() {
    const c: any = document.getElementById('stupidCanvas');
    this.cHeight = c.height;
    this.cWidth = c.width;
  }

  randomIntInBounds = (lower: number, upper: number) => {
    const min: number = Math.ceil(lower);
    const max: number = Math.floor(upper);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  addLine = () => {
    const { props } = this;
    const canvasHeight = this.cHeight;
    const canvasWidth = this.cWidth;
    const startPoint = new Point(
      this.randomIntInBounds(0, canvasWidth),
      this.randomIntInBounds(0, canvasHeight),
      0,
    );
    const endPoint = new Point(
      this.randomIntInBounds(0, canvasWidth),
      this.randomIntInBounds(0, canvasHeight),
      0,
    );
    const line = new Line(0, '', startPoint, endPoint);
    props.addLineAction(line);
  }

  clearCanvas = () => {
    const { props } = this;
    props.clearCanvasAction();
  }

  render() {
    return (
      <Paper className="controls__paper">
        <Typography variant="h6"> Controls </Typography>
        <MyButton variant="contained" color="primary" onClick={this.addLine} type="button">Draw Line</MyButton>
        <MyButton variant="outlined" color="primary" onClick={this.clearCanvas} type="button">Clear Canvas</MyButton>
      </Paper>
    );
  }
};

// @ts-ignore
Controls.displayName = 'Controls';
export default connect(
  null,
  { addLineAction, clearCanvasAction },
)(Controls);
