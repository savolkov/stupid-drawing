import React from 'react';
import './StupidDrawing.css';
import DrawZone from '../DrawZone/DrawZone';
import Controls from '../Controls/Controls';

interface Props {
}

interface State {
  data: any;
}

class StupidDrawing extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  updateData = (newData: any[]) => {
    let { data } = this.state;
    console.log(newData);
    if (newData.length === 0) {
      data = newData;
      this.setState({ data });
      return;
    }
    data.push(newData);
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="stupidDrawing">
        <DrawZone data={data} />
        <Controls updateData={this.updateData} />
      </div>
    );
  }
}


export default StupidDrawing;
