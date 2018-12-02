import { buildQuery } from './query';
import {state, setState } from '../state';
import query from 'query-string';

export const getJSON = (url, params) =>
  new Promise((resolve, reject) => {
    const queryStr = params != null ? '?' + query.stringify(params) : '';
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('GET', url + queryStr, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status !== 200) {
        reject(xhr.statusText);
      } else {
        resolve(JSON.parse(xhr.response));
      }
    };
    xhr.send();
  });

export const postForm = (url, params, body, goal) =>
  new Promise((resolve, reject) => {
    const queryStr = params != null ? query.stringify(params) : '';
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', url + queryStr, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status !== 200) {
        reject(xhr.statusText);
      } else {
        const response = JSON.parse(xhr.response);
        const item = response.item ? response.item : response.response_data;

        let {
          operationId,
          transactionId,
        } = state;

        if (operationId == null) {
          operationId = item.operation_id;
          setState({
            operationId,
          });
        }
        if (transactionId == null) {
          transactionId = item.transaction_id;
          setState({
            transactionId,
          });
        }
        if (goal != null) {
          const goalParams = {};
          if (operationId != null) {
            goalParams.operationId = operationId;
          }
          if (transactionId != null) {
            goalParams.transactionId = transactionId;
          }
        }
        resolve(response);
      }
    };

    if (body != null) {
      xhr.send(query.stringify(body));
      return;
    }

    xhr.send();
  });
