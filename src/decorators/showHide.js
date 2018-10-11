//HOC === Higher Order Component == Decorator
import React, { Component } from 'react'

const showHideDecorator = (OriginalComponent) =>
  class showHideDecorator extends Component {
    state = {
      isShow: false
    }

    toggleItemShowingState = () => this.setState({ isShow: !this.state.isShow })

    render() {
      return (
        <OriginalComponent
          {...this.props}
          toggleItemShowingState={this.toggleItemShowingState}
          isShow={this.state.isShow}
        />
      )
    }
  }

export default showHideDecorator
