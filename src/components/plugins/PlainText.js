import React from 'react';

export const name = 'PlainText';

export const editor = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      text: React.PropTypes.string
    })
  },

  getInitialState: function() {
    return {
      data: this.props.data
    };
  },

  render: function() {
    const {text} = this.state.data;
    return (
      <div>
        <textarea value={text} onChange={this.handleChange} />
      </div>
    );
  },

  handleChange: function(evt) {
    this.setState(
      {data: Object.assign({}, this.state.data, {text: evt.target.value})},
      () => this.props.onChange(this.state.data)
    );
  }
});

export const displayer = React.createClass({
  render: function() {
    const {text} = this.props.data;
    return <div>{text}</div>;
  }
});

export default {
  [name]: { editor, displayer }
};