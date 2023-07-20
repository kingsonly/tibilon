import React from 'react';
import InternalLayout from '../../layout/InternalLayout';

/**
 * This is an HOC that renders the Internal Layout components of the application
 * passing the required components as a props to the child.
 * @function
 * @param {object}  component - dashboard component.
 * @return {HTMLElement}
 */

const ComposeInternalLayouts = (Component) => (passThroughProps) => (
  <>
    <InternalLayout {...passThroughProps} Component={Component} />
  </>
);

export default ComposeInternalLayouts;
