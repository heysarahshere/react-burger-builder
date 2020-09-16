import React from 'react';
// import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';

const layout = (props) => (
    <React.Fragment>
    <div>Toolbar, Sidedrawer, Backdrop</div>
    <main className={classes.Content}>
        { props.children}
    </main>
    </React.Fragment>
);

export default layout;