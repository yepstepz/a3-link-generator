import {
  getJSON,
  postForm,
} from './xhr';

export const getCategory = (paidserviceId, partnerId) =>
  getJSON(`/front/operation/get_paidservice_category.do`, {
    partner_id: partnerId,
    paidservice_id: paidserviceId,
  });

export const getToolList = operationId =>
  getJSON(`/front/msp/tool_list.do`, {
    operation_id: operationId,
  });

export const initPaymentAPI = body =>
  postForm(`/front/msp/init_step_sequence_obr.do`, null, body, 'PAYMENT_START');

export const getCurrentStep = operationId =>
  getJSON(`/front/msp/get_current_step.do`, {
    operation_id: operationId,
  });

export const sendCurrentStep = body =>
  postForm(`/front/msp/store_step.do`, null, body);

export const addTool = (operationId, {
  exp,
  cvv,
  phone,
  ccNumber,
}) => postForm(`/front/msp/tool_add`, null, {
  cvv,
  exp: exp.slice(3) + exp.slice(0, 2),
  phone: phone.slice(2).replace(/[^0-9]/g, ''),
  number: ccNumber.replace(/\s/g, ''),
  operation_id: operationId,
}, 'PROCESSING');

export const getTransactionStatus = transactionId =>
  getJSON(`/front/operation/get_transaction_result_by_id_tns.do`, {
    transaction_id: transactionId,
  });

export const sendTransactionDetails = (transactionId, operationId, email) =>
  postForm(`/front/operation/send_transaction_details.do`, {
    transaction_id: transactionId,
  }, {
    email,
    operation_id: operationId,
  });
