import React from 'react';
// import Aux from '../../hoc/Auxiliary';

const layout = (props) => (
    <React.Fragment>
    <div>Toolbar, Sidedrawer, Backdrop</div>
    <main>
        { props.children}
    </main>
    </React.Fragment>
);

export default layout;