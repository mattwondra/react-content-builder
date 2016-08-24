import React from 'react';
import PlainText from './plugins/PlainText';

const DEFAULT_PLUGINS = Object.assign(
  {},
  PlainText
);

const TEST_DATA = [
  {
    type: 'PlainText',
    data: { text: 'This is some text' }
  },
  {
    type: 'PlainText',
    data: { text: 'This is some more text' }
  }
];

const ContentEditor = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    onSave: React.PropTypes.func,
    plugins: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      data: this.props.data,
      history: [this.props.data]
    };
  },

  getDefaultProps: function() {
    return {
      data: TEST_DATA,
      plugins: DEFAULT_PLUGINS
    };
  },

  render: function() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{flex: 1}}>
          {this.renderPlugins()}
        </div>
        <div style={{flex: 1}}>
          {this.renderPreview()}
        </div>
      </div>
    );
  },

  renderPlugins: function() {
    // Rename? These are "content objects" not plugins
    return this.state.data.map(({type, data}, idx) => {
      const Editor = this.props.plugins[type].editor;
      // PLUGIN WRAPPER GOES HERE!
      return <Editor data={data} onChange={(newData) => this.handleChange(idx, newData)} key={idx} />;
    });
  },

  renderPreview: function() {
    return this.state.data.map(({type, data}, idx) => {
      const Displayer = this.props.plugins[type].displayer;
      // DISPLAYER WRAPPER GOES HERE! if any?
      return <Displayer data={data} key={idx} />;
    });
  },

  handleChange: function(idx, newData) {
    this.setState({
      data: [].concat(
        this.state.data.slice(0, idx),
        [Object.assign({}, this.state.data[idx], {data: newData})],
        this.state.data.slice(idx+1)
      )
    });
  }
});

export default ContentEditor;
