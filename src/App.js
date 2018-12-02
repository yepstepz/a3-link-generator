import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  addTool,
  getToolList,
  getCategory,
  getCurrentStep,
  initPaymentAPI,
  sendCurrentStep,
} from './api';

import {
  TNS_PAIDSERVICE_NAME,
} from './constants';

import Tabs from './components/UI/Tabs';
import Form from './components/UI/Form';

class App extends Component {
  constructor(){
    super();
    this.state = {
      operationId: null,
      transactionId: null,
      paidserviceId: null,
      fields: []
    }
  }
  initPayment(initData) {
    initPaymentAPI(initData).then(({
      item: {
        operation_id: operationId,
      },
    }) => {
      //todo: remove operationId
      // remove get current step / optimize store step
      getCurrentStep(operationId).then((current) => {
        console.log(operationId, current);
        this.setState({
          operationId
        })
      })
      .then(() => this.storeStep({operation_id: this.state.operationId}))
    });
  }

  storeStep(data) {
    console.log('---data', data);
    let step = [];
    sendCurrentStep(data).then((result) => {
      result.item.template.div.forEach(div => div.fields.field.forEach((field) => {
          step[`${field.name}$${div.order}$${field.order}`] = field;
      }));

    });
    console.log(step);
  }

  componentDidMount(){

  }

  render() {
    return (
      <div className="App">
       <Tabs
        TabNames={["По данным", "По operation_id"]}
        TabComponents={[() => <div>kek1</div>, () => <div>kek2</div> ]}
       />
       <h2>Введите поставщика</h2>
       <Form
       initialValues={{ partner_id: 80000227 }}
        onSubmit={(item) => this.initPayment(item)}
        Inputs={[
          {
            label: "Id поставщика",
            type: "INPUT",
            name: "paidservice_id"
          },
          {
            label: "Id партнера",
            type: "INPUT",
            name: "partner_id",
          },
        ]}
        SubmitText="Отправить"
       />
      </div>
    );
  }

}

export default App;
