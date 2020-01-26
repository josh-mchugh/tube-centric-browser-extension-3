import React from 'react';
import "./content.scss";
import { DomObserver } from './utils/DomObserver';

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

      const title = document.querySelector(this.titleSelector).textContent;
      const description = document.querySelector(this.descriptionSelector).textContent;

      this.setState({
        title: title,
        description: description,
        tags: this.getTagsFromDOM(),
        titleTags: this.getTagsInString(title),
        descriptionTags: this.getTagsInString(description)
      });

      this.titleObserver = new DomObserver(this.titleSelector, this.handleTitleChange).observe();
      this.descriptionObserver = new DomObserver(this.descriptionSelector, this.handleDescriptionChange).observe();
      this.tagsObserver = new DomObserver(this.tagsContainerSelector, this.handleTagsChange).observe();
    }

    componentWillUnmount() {

      this.titleObserver.disconnect();
      this.descriptionObserver.disconnect();
      this.tagsObserver.disconnect();
    }

    handleTitleChange = (mutations) => {
      mutations.forEach(mutation =>
          this.setState({
            title: mutation.target.textContent,
            titleTags: this.getTagsInString(mutation.target.textContent)
          })
      );
    }

    handleDescriptionChange = (mutations) => {
      mutations.forEach(mutation =>
        this.setState({
          description: mutation.target.textContent,
          descriptionTags: this.getTagsInString(mutation.target.textContent)
        })
      );
    }

    handleTagsChange = (mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length >= 1 || mutation.removedNodes.length >= 1) {
          this.setState({
            tags: this.getTagsFromDOM(),
            titleTags: this.getTagsInString(this.state.title),
            descriptionTags: this.getTagsInString(this.state.description)
          })
        }
      });
    }

    getTagsFromDOM = () => {
      const tags = [];
      document.querySelectorAll(this.tagsSelector).forEach(node => {
        tags.push(node.textContent);
      });
      return tags;
    }

    getTagsInString = (value) => {
      if (!this.state.tags) {
        return [];
      }
      return this.state.tags.filter(tag => value.toLowerCase().includes(tag.toLowerCase()));
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
