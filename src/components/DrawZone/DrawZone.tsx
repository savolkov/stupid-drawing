import React from 'react';
import './DrawZone.css';

class DrawZone extends React.Component {
    render() {
        return <div className="drawZone">
            <canvas className="stupidCanvas"></canvas>
            </div>;
    }
}

// const DrawZone: React.FC = () => {
//     return (
//         <div className="drawZone">
//             <canvas className="stupidCanvas"></canvas>
//         </div>
//     );
// }

export default DrawZone;
