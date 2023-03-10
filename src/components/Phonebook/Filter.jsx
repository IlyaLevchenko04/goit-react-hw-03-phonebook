import { Component } from 'react';
import PropTypes from 'prop-types';

export class Filter extends Component {
  render() {
    return <input type="text" name="filter" onChange={this.props.onChange} />;
  }
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
