import React from 'react';
import './SetEquation.css';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {Button, styled, TextField} from "@material-ui/core";
import { addLineAction } from "../../actions/lineActions";
import Point from "../../classes/Point";
import Line from "../../classes/Line";
import nanoid from "nanoid";

interface Props {
  addLineAction: typeof addLineAction,
}

const MyButton = styled(Button)({
  marginRight: '4px',
});

class SetEquation extends React.Component<Props> {
  a: number;

  b: number;

  c: number;

  cWidth: number;

  cHeight: number;

  constructor(props: Props) {
    super(props);
    this.a = 0;
    this.b = 0;
    this.c = 0;
    this.cHeight = 0;
    this.cWidth = 0;
  }

  randomIntInBounds = (lower: number, upper: number) => {
    const min: number = Math.ceil(lower);
    const max: number = Math.floor(upper);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getLine = (a: number, b: number, c: number): Line => {
    if (this.cWidth === 0 && this.cHeight === 0) {
      const c: any = document.getElementById('stupidCanvas');
      this.cWidth = c.width;
      this.cHeight = c.height;
    }

    let randX1: number;
    let randX2: number;
    let randY1: number;
    let randY2: number;
    do {
      randX1 = this.randomIntInBounds(0, this.cWidth);
      randY1 = (-c - a * randX1) / b;
    } while (randY1 < 0)

    do {
      randX2 = this.randomIntInBounds(0, this.cWidth);
      randY2 = (-c - a * randX2) / b;
    } while (randY2 < 0)
    const point1: Point = new Point(randX1, randY1, 0);
    const point2: Point = new Point(randX2, randY2, 0);
    return new Line(nanoid(), '', point1, point2);
  };

  addLineManually = () => {
    const { props, a, b, c } = this;
    const line = this.getLine(a, b, c);
    props.addLineAction(line);
  }

  handleValueChange = (value: string, source: string) => {
    const numericValue: number = Number(value);
    switch (source) {
      case 'A':
        this.a = numericValue;
        break;
      case 'B':
        this.b = numericValue;
        break;
      case 'C':
        this.c = numericValue;
        break;
    }
  };

  render() {
    const { props } = this;
    return (
      <div className="equation">
        <Typography variant="subtitle1">Add Line Manually</Typography>
        <form className="equation" noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            type="number"
            label="A"
            onChange={event => this.handleValueChange(event.target.value, 'A')}
          />
          <TextField
            id="standard-basic"
            type="number"
            label="B"
            onChange={event => this.handleValueChange(event.target.value, 'B')}
          />
          <TextField
            id="standard-basic"
            type="number"
            label="C"
            onChange={event => this.handleValueChange(event.target.value, 'C')}
          />
        </form>
        <MyButton variant="outlined" color="primary" onClick={this.addLineManually} type="button">Add Line</MyButton>
      </div>
    );
  }
}

export default connect(
  null,
  { addLineAction },
)(SetEquation);