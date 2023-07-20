import React from 'react';
import ClientInternalLayout from '../../layout/ClientInternalLayout';

/**
 * This is an HOC that renders the Internal Layout components of the application
 * passing the required components as a props to the child.
 * @function
 * @param {object}  component - dashboard component.
 * @return {HTMLElement}
 */

const ComposeInternalClientLayouts = (Component) => (passThroughProps) => (
  <>
    <ClientInternalLayout {...passThroughProps} Component={Component} />
  </>
);

export default ComposeInternalClientLayouts;
