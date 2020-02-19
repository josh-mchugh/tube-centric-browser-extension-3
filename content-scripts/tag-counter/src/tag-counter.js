import React from 'react';
import "./content.scss";
import MutationSummary from 'mutation-summary';
import { Logger } from "tubecentric-extension-lib";
import * as browser from 'webextension-polyfill';

export class TagCounter extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        title: "",
        description: "",
        tags: [],
        titleTags: [],
        descriptionTags: []
      };

      this.titleSelector = '#left .title #textbox';
      this.descriptionSelector = '#left .description #textbox';
      this.tagsContainerSelector = '#left .tags #chip-bar .chip-and-bar';
      this.tagsSelector = this.tagsContainerSelector + ' #chip-text';

      this.titleObserver = null
      this.descriptionObserver = null;
      this.tagsObserver = null;
    }

    componentDidMount() {

      this.titleObserver = new MutationSummary({
        callback: this.handleTitleChange,
        rootNode: document.querySelector(this.titleSelector),
        queries: [{ characterData: true }]
      });

      this.descriptionObserver = new MutationSummary({
        callback: this.handleDescriptionChange,
        rootNode: document.querySelector(this.descriptionSelector),
        queries: [{ characterData: true }]
      });

      this.tagsObserver = new MutationSummary({
        callback: this.handleTagsChange,
        rootNode: document.querySelector(this.tagsContainerSelector),
        queries: [{ element: "#chip-text" }]
      });
    }

    componentWillUnmount() {
      this.titleObserver.disconnect();
      this.descriptionObserver.disconnect();
      this.tagsObserver.disconnect();
    }

    handleTitleChange = (summaries) => {
      const summary = summaries[0];
      if(summary.added.length && !summary.valueChanged.length) {
        const value = summary.added[0].textContent;
        Logger.info("Title intialized");
        this.setState({
          title: value,
          titleTags: this.getTagsInString(value, this.state.tags)
        });
      }

      if(summary.removed.length && !summary.valueChanged.length) {
        Logger.info("Title cleared");
        this.setState({
          title: "",
          titleTags: this.getTagsInString("", this.state.tags)
        });
      }

      if(summary.valueChanged.length){
        Logger.info("Title changed");
        const value = summary.valueChanged[0].textContent;
        this.setState({
          title: value,
          titleTags: this.getTagsInString(value, this.state.tags)
        });
      }
    }

    handleDescriptionChange = (summaries) => {
      const summary = summaries[0];
      if(summary.added.length && !summary.valueChanged.length) {
        Logger.info("Description intialized");
        const value = summary.added[0].textContent;
        this.setState({
          description: value,
          descriptionTags: this.getTagsInString(value, this.state.tags)
        });
      }

      if(summary.removed.length && !summary.valueChanged.length) {
        Logger.info("Description cleared");
        this.setState({
          description: "",
          descriptionTags: this.getTagsInString("", this.state.tags)
        });
      }

      if(summary.valueChanged.length){
        Logger.info("description changed");
        const value = summary.valueChanged[0].textContent;
        this.setState({
          description: value,
          descriptionTags: this.getTagsInString(value, this.state.tags)
        });
      }
    }

    handleTagsChange = (summaries) => {
      const summary = summaries[0];
      if (summary.added.length || summary.removed.length) {
        Logger.info("Tags changed");
        const tags = this.getTagsFromDOM();
        this.setState({
          tags: tags,
          titleTags: this.getTagsInString(this.state.title, tags),
          descriptionTags: this.getTagsInString(this.state.description, tags)
        });
      }
    }

    getTagsFromDOM = () => {
      const tags = [];
      document.querySelectorAll(this.tagsSelector).forEach(node => {
        tags.push(node.textContent);
      });
      return tags;
    }

    getTagsInString = (value, tags) => {
      if (!tags.length) {
        return [];
      }
      return tags.filter(tag => value.toLowerCase().includes(tag.toLowerCase()));
    }

    getTagsCount = () => {
      return this.state.tags.length;
    }

    getTitleTagsCount = () => {
      return this.state.titleTags.length;
    }

    getDescriptionTagsCount = () => {
      return this.state.descriptionTags.length;
    }

    getTotalTagsUsedCount = () => {
      return this.getTotalTagsUsed().size;
    }

    getTotalTagsUsed = () => {
      return new Set([...this.state.titleTags, ...this.state.descriptionTags]);
    }

    render() {
        return (
            <div className={'tc-scope'}>
              <div className={'logo'}>
                <img src={browser.runtime.getURL("/assets/logo-icon.svg")} alt="TubeCentric logo"/>
              </div>
              <div className={'container'}>
                <div>
                  <div className={'value'}>
                    {this.getTitleTagsCount()} / {this.getTagsCount()}
                  </div>
                  <div className={'label'}>
                    Tags in Title
                  </div>
                </div>
                <div>
                  <div className={'value'}>
                    {this.getDescriptionTagsCount()} / {this.getTagsCount()}
                  </div>
                  <div className={'label'}>
                    Tags in Description
                  </div>
                </div>
                <div>
                  <div className={'value'}>
                    {this.getTotalTagsUsedCount()} / {this.getTagsCount()}
                  </div>
                  <div className={'label'}>
                    Tags Used
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
