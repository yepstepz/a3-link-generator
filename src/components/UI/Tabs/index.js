import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

export default ({TabNames, TabComponents}) => (
  <Tabs>
    <TabList>
      {
        TabNames.map((name) => {
          return <Tab>{name}</Tab> 
        })
      }
    </TabList>
    {
      TabComponents.map((component) => {
        return <TabPanel>{component()}</TabPanel>
      })
    }
  </Tabs>
);