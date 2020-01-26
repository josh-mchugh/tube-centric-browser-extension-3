import React from 'react'
import './App.scss';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as browser from 'webextension-polyfill';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      query: "",
      results: [],
      tooltipText: "Click to add"
    }
  }

  handleClose = () => {
    this.setState({show: false});
  }

  handleOpen = () => {
    this.searchKeywords(this.state.query);
    this.setState({show: true});
  }

  onKeyUp = (event) => {
    if(event.keyCode === 13){
      this.setState({
        query: event.target.value,
        show: true
      });
      this.searchKeywords(event.target.value);
    }
  }

  onSearchButtonClick = () => {
    this.searchKeywords(this.state.query);
  }

  onSearchInputChange = (event) => {
    this.setState({query: event.target.value});
  }

  searchKeywords = (query) => {
    browser.runtime.sendMessage({
      type: 'SEARCH_KEYWORDS',
      query: query
    })
    .then((response) => {
        this.setState({results: response.data});
    });
  }

  onSearchResultClick = (tag) => {
    document.querySelector("#left .tags #text-input").focus();
    document.querySelector("#left .tags #text-input").value = tag;
    document.querySelector("#left .tags #text-input").blur();
    this.setState({tooltipText: "Added!"});
  }

  onToolTipHide = () => {
    this.setState({tooltipText: 'Click to add'});
  }

  renderTooltip = (placement) => {
    return <Tooltip id={`tooltip-${placement}`}>{this.state.tooltipText}</Tooltip>;
  }

  render() {
    return (
        <div className={'tc-scope'}>
          <div className={'container'}>
            <div className={'search-form'}>
              <input className={'form-control'} placeholder={'Search Keywords'} value={this.state.query} onChange={this.onSearchInputChange} onKeyUp={this.onKeyUp} />
              <button className={'btn btn-primary'} type='button' onClick={this.handleOpen}>Search</button>
            </div>
          </div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className='tc-modal-title'>
                  Search Keywords
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={'tc-modal-body'}>
                <div className={'search-form'}>
                    <input className={'form-control'} placeholder={'Search Keywords'} value={this.state.query} onChange={this.onSearchInputChange} onKeyUp={this.onKeyUp} />
                    <button className={'btn btn-primary'} type="button" onClick={this.onSearchButtonClick}>Search</button>
                </div>
                {this.state.results.length > 0 &&
                  <div className={'search-results'}>
                    <div className={'header'}>
                      Most Relavent Tags
                    </div>
                    <ul className={'results'}>
                      {this.state.results.map((item, index) =>
                        <OverlayTrigger
                          key={index}
                          placement="right"
                          onExit={this.onToolTipHide}
                          overlay={this.renderTooltip(index)}
                        >
                          <li key={index} className={'item'} onClick={() => this.onSearchResultClick(item.string)}>{item.string}</li>
                        </OverlayTrigger>
                      )}
                    </ul>
                  </div>
                }
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
    )
  }
}

export default App;
