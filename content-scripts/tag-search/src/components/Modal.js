import React from 'react';
import * as browser from 'webextension-polyfill';
import styles from '../scss/App.module.scss';

export default class Modal extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    onCloseKeyUp = (event) => {
        if(event.keyCode === 13) {
            this.props.close();
        }
    }

    modalDisplayStyle = () => {
        if (this.props.open) {
            return `${styles['tc-modal']} ${styles['tc-modal--show']}`;
        }
        return `${styles['tc-modal']}`;
    }
    
    render() {
        
        if (!this.props.open) {
            return null;
        }
        
        return (
            <div className={this.modalDisplayStyle()}>
                <div className={`${styles['tc-modal-content']}`}>
                    <div className={`${styles['tc-modal-header']}`}>
                        <div className={`${styles['tc-modal-header__logo']}`}>
                            <img src={browser.runtime.getURL("/assets/logo-icon.svg")} />
                        </div>
                        <div className={`${styles['tc-modal-header__title']}`}>Search Keywords</div>
                        <div className={`${styles['tc-modal-header__close']}`} tabIndex={0} onClick={this.props.close} onKeyUp={this.onCloseKeyUp}>&times;</div>
                    </div>
                    <div className={`${styles['tc-modal-body']}`}>
                        {this.props.children}
                    </div>
                    <div className={`${styles['tc-modal-footer']}`}>
                        <button className={`${styles['btn']} ${styles['button--secondary']}`} type={'button'} onClick={this.props.close}>Close</button> 
                    </div>
                </div>
            </div>
        )
    }
}