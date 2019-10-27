import React from 'react';
import './Coordinates.css';
import { connect } from 'react-redux';

const mapStateToProps = (store: any) => ({
  data: store.linesState,
});

const mapDispatchToProps = {
};

class Coordinates extends React.Component {
  render() {
    return (
      <div className="coordinates">
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Coordinates);
