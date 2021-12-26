import React from 'react'
import {
    Header,
    Segment,
    TransitionablePortal,
} from 'semantic-ui-react'


function Portal(props) {
    return (
        <div>
            <TransitionablePortal open={props.open}>
                <Segment
                    textAlign='center'
                    style={{ left: '80%', position: 'fixed', top: '0%', zIndex: 1000 }}
                >
                    <Header>{props.info}</Header>
                </Segment>
            </TransitionablePortal>

        </div>
    );
}

export default Portal;

