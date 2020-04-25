import React from 'react';
import styles from '../scss/App.module.scss';
import { Logger } from 'tubecentric-extension-lib';
import MutationSummary from 'mutation-summary';

export default class RelatedTag extends React.Component {

    editSelectors = {
        tagsInput: "#left .tags #text-input",
        tagsContainer: "#left .tags #chip-bar .chip-and-bar",
        tagChips: "#chip-bar .chip",
        tagsText: "#left .tags #chip-bar .chip-and-bar #chip-text"
    };
  
    uploadSelectors = {
        tagsInput: "#tags-container #text-input",
        tagsContainer: ".left-col #tags-container",
        tagChips: "#tags-container .chip",
        tagsText: ".left-col #tags-container #chip-text"
    };

    tagsObserver = null;

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectors:  props.location === "edit"  ? this.editSelectors  : this.uploadSelectors,
            tags: [],
            added: false,
        }
    }

    componentDidMount() {
        this.tagsObserver = new MutationSummary({
            callback: this.handleTagsChange,
            rootNode: document.querySelector(this.state.selectors.tagsContainer),
            queries: [{ element: "#chip-text" }]
        });

        const tags = this.getTagsFromDOM();
        this.setState({
            tags: tags,
            added: tags.includes(this.props.relatedKeyword.tag)
        });
    }

    componentWillUnmount() {
        this.tagsObserver.disconnect();
    }

    handleTagsChange = (summaries) => {
        const summary = summaries[0];
        if (summary.added.length || summary.removed.length) {
            Logger.info("Tags changed");
            const tags = this.getTagsFromDOM();
            this.setState({
                tags: tags,
                added: tags.includes(this.props.relatedKeyword.tag)
            });
        }
    }

    getTagsFromDOM = () => {
        const tags = [];
        document.querySelectorAll(this.state.selectors.tagsText).forEach(node => {
            tags.push(node.textContent);
        });
        return tags;
    }    

    buildItemTitle = (title) => {

        var newTitle = title;

        for (let i = 0; i < this.props.words.length; i++) {

            const word = this.props.words[i];
            var regex = new RegExp(`\\b${word}\\b`, "gi");

            if(regex.test(title)) {

                newTitle = newTitle.replace(regex, `<span class="${styles['tc-search-item-title__highlight']}">${word}</span>`);
            }
        }

        return newTitle;
    }

    getActionBtnText = () => {
        
        if (this.state.added) {
            return "Remove";
        }

        return "Add";
    }

    onTagAction = (event) => {

        if (this.state.added) {

            var tagChips = document.querySelectorAll(this.state.selectors.tagChips);
            Logger.info("tags length: ", tagChips.length);
            for (let i = 0; i < tagChips.length; i++) {
                const element = tagChips[i];
                const tag = element.querySelector("#chip-text").textContent;
                Logger.info("tag: ", tag);
                if(tag === this.props.relatedKeyword.tag) {

                    element.querySelector("#delete-icon").click();
                    event.target.focus();
                    event.target.blur();
                }
            }

        } else {

            document.querySelector(this.state.selectors.tagsInput).focus();
            document.querySelector(this.state.selectors.tagsInput).value = this.props.relatedKeyword.tag;
            document.querySelector(this.state.selectors.tagsInput).blur();
            event.target.focus();
            event.target.blur();

        }
    }

    render() {

        return (
            <div className={`${styles['tc-search-list__item']}`}>
                <div className={`${styles['tc-search-item-title']}`} dangerouslySetInnerHTML={ {__html: this.buildItemTitle(this.props.relatedKeyword.tag)}}></div>
                <div className={`${styles['tc-search-item-container']}`}>
                    <div className={`${styles['tc-search-item-container__guage']}`}>
                        <div className={`${styles['tc-search-item-gauge']}`}>
                            <div className={`${styles['tc-search-item-guage__meter']}`} style={ {width: `${this.props.relatedKeyword.ratio}%`} }></div>
                        </div>
                    </div>
                    <div className={`${styles['tc-search-item-container__rating']}`}>
                        <div className={`${styles['tc-search-item-rating']}`}>{this.props.relatedKeyword.ratio}</div>
                    </div>
                </div>
                <div className={`${styles['tc-search-item-container']}`}>
                    <div className={`${styles['tc-search-item-container__button']}`}>
                        <button className={`${styles['btn']} ${styles['button--primary']}`} onClick={this.onTagAction}>{this.getActionBtnText()}</button>
                    </div>
                </div>
            </div>
        )
    }
}
