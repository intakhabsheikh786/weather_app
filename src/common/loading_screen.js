import React, { Component } from 'react';
import loading from '../assets/loading.gif'

class Loading extends Component {
    state = {}
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img style={{}} className="img-fluid" alt="loading" src={loading} />
            </div>
        );
    }
}

export default Loading;