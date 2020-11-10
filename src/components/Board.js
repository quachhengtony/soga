import React from 'react';
import { Card, H2 } from '@blueprintjs/core';

import './Board.css'

function Board() {
    return (
        <div className='board'>
            <Card elevaction={1}>
                <H2>To do</H2>
            </Card>
        </div>
    );
}

export default Board;
