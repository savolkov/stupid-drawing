import React from 'react';
import './Controls.css';

class Controls extends React.Component {
    handleClick(e: any) {
        console.log(e);
    }

    render() {
        return<div className="controls">
            <button onClick = {this.handleClick}>btn</button>
            btn
        </div>
    }
}
// const Controls: React.FC = () => {
//     return (

//     );
// }

export default Controls;
