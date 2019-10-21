import React from 'react';
import './StupidDrawing.css';
import DrawZone from '../DrawZone/DrawZone';
import Controls from '../Controls/Controls';

type Props = {
};


class StupidDrawing extends React.Component<Props> {
  data: any[] = [];

  updateData = (data: any[]) => {
    if (data === null) {
      this.data = data;
      return;
    }
    this.data.push(data);
    this.setState({ data: this.data, });
  }

  render() {
    return (
      <div className="stupidDrawing">
        <DrawZone data={this.state.data}/>
        <Controls updateData={this.updateData} />
      </div>
    );
  }
}


export default StupidDrawing;
