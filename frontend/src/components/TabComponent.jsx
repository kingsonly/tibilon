import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

/**
 * Represents the Default Tab component.
 * @function
 * @param {object} component - stores components(header & component) to be rendered
 * It is an Array of objects with keys; id - unique key; header - tab name 
 * and component - which is the jsx component page/body content to be rendered 
 * (can refer to TabCompoent.test.js or payments page file for useage )
 * @Description - this component handles the tab functionalities of the application
 *
 */

export default function TabComponent({ components }) {
  return (
    <div className="h-screen p-0">
      <Tabs className="Tabs">
        {/* Tab Headers */}
        <TabList>
          {components?.map((component) => (
            <Tab key={component?.id}>{component?.header}</Tab>
          ))}
        </TabList>
        {/* Tab Body/Content */}
        {components?.map((component) => (
          <TabPanel key={component?.id} className="mb-4">
            <component.component />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
