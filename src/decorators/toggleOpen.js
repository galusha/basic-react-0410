import React from 'react'

export default (OriginalComponent) =>
  class ToggleOpen extends React.Component {
    state = {
      isOpen: false
    }

    toggleOpen = (callback) => {
      this.setState((state) => ({
        isOpen: !state.isOpen
      }))

      if (callback) {
        callback(this.state)
      }
    }

    render() {
      return (
        <OriginalComponent
          {...this.props}
          {...this.state}
          toggleOpen={this.toggleOpen}
        />
      )
    }
  }
