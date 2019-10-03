import React from 'react';
import './StupidDrawing.css';
import '../DrawZone/DrawZone';
import '../Controls/Controls'
import DrawZone from '../DrawZone/DrawZone';
import Controls from '../Controls/Controls';

type Props = {
};

class StupidDrawing extends React.Component<Props> {
    render() {
        return <div className='stupidDrawing'><DrawZone /> <Controls /></div>
    }
}

export default StupidDrawing;
