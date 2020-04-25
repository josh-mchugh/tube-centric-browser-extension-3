import React from 'react';
import styles from '../scss/App.module.scss';
import RelatedTag from './RelatedTag';

export default class RelatedTagsList extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    displayTabContent = () => {
        
        if (this.props.show) {
            return `${styles['tc-tabs__content']} ${styles['tc-tabs__content--active']}`;
        }

        return `${styles['tc-tabs__content']}`;
    }

    buildRelatedKeywords = () => {

        if (!this.props.results.rankedTags) {
            return null;
        }

    return this.props.results.rankedTags.map( (relatedKeyword) => {
 
            return <RelatedTag 
                        relatedKeyword={relatedKeyword} 
                        words={this.props.results.words}
                        location={this.props.location}/>
        });
    }

    render() {

        return (

            <div className={this.displayTabContent()}>
                <div className={`${styles['tc-search-form']}`}>
                    <div className={`${styles['input-group']}`}>
                        <input className={`${styles['form-control']}`} placeholder={'Search Keywords'} value={this.props.query} onChange={this.props.onQueryChange} onKeyUp={this.props.onSearchEnter} ref={input => input && input.focus()}/>
                        <div className={`${styles['input-group-append']}`}>
                            <button className={`${styles['btn']} ${styles['button--primary']}`} type={'button'} onClick={this.props.onSearch}>Search</button>
                        </div>
                    </div>
                </div>
                <div className={`${styles['tc-search-list']}`}>
                    {this.buildRelatedKeywords()}
                </div>
            </div>
        );
    }
}