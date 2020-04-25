import React from 'react'
import styles from './scss/App.module.scss';
import * as browser from 'webextension-polyfill';
import { Logger } from 'tubecentric-extension-lib';
import Modal from './components/Modal';
import RelatedTagsList from './components/RelatedTagsList';
import TabsContainer from './components/TabsContainer';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      query: "",
      results: {},
      location:  props.location
    }
  }

  onQueryChange = (event) => {
    this.setState({query: event.target.value});
  }

  onSearchEnter = (event) => {
    if(event.keyCode === 13){
      this.setState({
        query: event.target.value,
        open: true
      });
      this.onSearch();
    }
  }

  onSearchButtonClick = () => {
    this.setState({open: true});
    this.onSearch();
  }

  onSearch = () => {
    browser.runtime.sendMessage({
      type: 'SEARCH_KEYWORDS',
      query: this.state.query
    })
    .then((response) => {
        this.setState({results: response.data});
    });
  }

  render() {
    return (
        <div className={styles['tc']}>
          <div className={styles['tc-logo']}>
            <img className={styles['tc-logo__img']} src={browser.runtime.getURL("/assets/logo-icon.svg")}/>
          </div>
          <div className={styles['tc-widget']}>
            <div className={styles['tc-widget__search']}>
              <div className={styles['input-group']}>
                <input className={styles['form-control']} placeholder={'Search Keywords'} value={this.state.query} onChange={this.onQueryChange} onKeyUp={this.onSearchEnter} />
                <div className={styles['input-group-append']}>
                  <button className={`${styles['btn']} ${styles['button--primary']}`} type='button' onClick={this.onSearchButtonClick}>Search</button>
                </div>
              </div>
            </div>
          </div>
          <Modal 
            open={this.state.open} 
            close={() => this.setState({open: false})}>
              <TabsContainer>
                <RelatedTagsList
                  show={true} 
                  query={this.state.query}
                  onQueryChange={this.onQueryChange}
                  onSearch={this.onSearch}
                  onSearchEnter={this.onSearchEnter}
                  results={this.state.results}
                  location={this.state.location}>
                </RelatedTagsList>
            </TabsContainer>
          </Modal>
        </div>
    )
  }
}

export default App;
