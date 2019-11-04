import React from 'react';
import './Coordinates.css';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import MouseIcon from '@material-ui/icons/Mouse';

interface Props {
  mouse: any;
}

class Coordinates extends React.Component<Props> {
  getCoords() {
    const { props } = this;
    return `(${props.mouse.x}, ${props.mouse.y})`;
  }

  render() {
    const { props } = this;
    if (props.mouse.eq) {
      return (
        <div className="coordinates">
          <Paper className="coordinates__paper">
            <Typography variant="h6"> Координаты курсора: </Typography>
            <Chip variant="outlined" color="primary" icon={<MouseIcon />} label={this.getCoords()} />
          </Paper>
          <Paper className="coordinates__paper">
            <Typography variant="h6"> Уравнение прямой </Typography>
            <Chip variant="outlined" color="primary" icon={<ShowChartIcon />} label={props.mouse.eq} />
          </Paper>
        </div>
      );
    }
    return (
      <div className="coordinates">
        <Paper className="coordinates__paper">
          <Typography variant="h6"> Координаты курсора </Typography>
          <Chip variant="outlined" color="primary" icon={<MouseIcon />} label={this.getCoords()} />
        </Paper>
        <Paper className="coordinates__paper">
          <Typography variant="h6"> Уравнение прямой </Typography>
          <Chip variant="outlined" color="primary" icon={<ShowChartIcon />} label="n/a" />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (store: any) => {
  const mouse = store.mouseState;
  return { mouse };
};

export default connect(
  mapStateToProps,
  {},
)(Coordinates);
