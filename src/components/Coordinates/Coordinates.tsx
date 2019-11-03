import React from 'react';
import './Coordinates.css';
import { connect } from 'react-redux';

interface Props {
  mouse: any;
}

class Coordinates extends React.Component<Props> {
  render() {
    const { props } = this;
    if (props.mouse.eq) {
      return (
        <div className="coordinates">
          Координаты курсора:
          <br />
          (
          { props.mouse.x }
          ,
          { props.mouse.y }
          )
          <br />
          Уравнение прямой:
          <br />
          { props.mouse.eq }
        </div>
      );
    }
    return (
      <div className="coordinates">
        Координаты курсора:
        <br />
        (
        { props.mouse.x }
        ,
        { props.mouse.y }
        )
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
