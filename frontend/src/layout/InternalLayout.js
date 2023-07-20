import React from "react";
import PropTypes from "prop-types";
import DashBoardHeader from "../components/DashBoardHeader";


/**
 * This is the Internal Layout components of the app. It renders the passed
 *  components and default Dashboard header
 * @function
 * @param {object}  props - dashboard component.
 * @param   {object} Component Component to be rendered
 * @param   {object} title  Title of the component
 * @return {HTMLElement}
 */

const InternalLayout = ({ Component, title, ...otherProps }) => (
  <>
    <div
      // h='100vh'
      // overflowY='scroll'
      pb={"1em"}
    >
      <div>
        <div >
          <DashBoardHeader title={title} />
          <main className="ml-[300px]">
            <Component {...otherProps} />
          </main>
        </div>
      </div>
    </div>
  </>
);

InternalLayout.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  otherProps: PropTypes.objectOf(PropTypes.object),
  title: PropTypes.string,
};

InternalLayout.defaultProps = {
  otherProps: {},
  title: "Dashboard",
};

export default InternalLayout;
