import React from 'react';
import "./content.scss";
import { DomObserver } from './utils/DomObserver';

export class TagCounter extends React.Component {

    titleSelector = '#left .title #textbox';
    descriptionSelector = '#left .description #textbox';
    tagsContainerSelector = '#left .tags #chip-bar .chip-and-bar';
    tagsSelector = this.tagsContainerSelector + ' #chip-text';

    titleObserver = null
    descriptionObserver = null;
    tagsObserver = null;

    constructor(props, context) {
      super(props, context);
      this.state = {
        title: "",
        description: "",
        tags: [],
        titleTags: [],
        descriptionTags: []
      };
    }

    componentDidMount() {

      this.setState({
        title: document.querySelector(this.titleSelector).textContent,
        description: document.querySelector(this.descriptionSelector).textContent,
        tags: this.getTagsFromTagsContainer(),
        titleTags: this.getTagsInTitle(),
        descriptionTags: this.getTagsInDescription()
      });

      this.titleObserver = new DomObserver(this.titleSelector, this.handleTitleChange).observe();
      this.descriptionObserver = new DomObserver(this.descriptionSelector, this.handleDescriptionChange).observe();
      this.tagsObserver = new DomObserver(this.tagsContainerSelector, this.handleTagsChange).observe();
    }

    handleTitleChange = (mutations) => {
      mutations.forEach(mutation =>
          this.setState({
            title: mutation.target.textContent,
            titleTags: this.getTagsInTitle()
          })
      );
    }

    handleDescriptionChange = (mutations) => {
      mutations.forEach(mutation =>
        this.setState({
          description: mutation.target.textContent,
          descriptionTags: this.getTagsInDescription()
        })
      );
    }

    handleTagsChange = (mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length >= 1 || mutation.removedNodes.length >= 1) {
          this.setState({
            tags: this.getTagsFromTagsContainer(),
            titleTags: this.getTagsInTitle(),
            descriptionTags: this.getTagsInDescription()
          })
        }
      });
    }

    getTagsFromTagsContainer = () => {
      const tags = [];
      document.querySelectorAll(this.tagsSelector).forEach(node => {
        tags.push(node.textContent);
      });
      return tags;
    }

    getTagsInTitle = () => {
      if (!this.state.tags || !this.state.title) {
        return [];
      }
      return this.state.tags.filter(tag => this.state.title.toLowerCase().includes(tag.toLowerCase()));
    }

    getTagsInDescription = () => {
      if (!this.state.tags || !this.state.description) {
        return [];
      }
      return this.state.tags.filter(tag => this.state.description.toLowerCase().includes(tag.toLowerCase()));
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
      return this.state.getTotalTagsUsed().size;
    }

    getTotalTagsUsed = () => {
      return new Set([...this.state.titleTags, ...this.state.descriptionTags]);
    }

    render() {
        return (
            <div className={'tc-scope'}>
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
                      {this.getTitleTagsCount() + this.getDescriptionTagsCount()} / {this.getTagsCount()}
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
