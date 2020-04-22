import React from 'react';
import styles from '../scss/App.module.scss';

export default class TabsContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <div className={`${styles['tc-tabs']}`}>
                {this.props.children}
            </div>
        );
    }
}