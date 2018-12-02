export let state = {
  sum: 0,
  fee: 0,
  step: 1,
  date: '',
  store: null,
  address: '',
  pending: false,
  statusId: null,
  partnerId: null,
  feePercent: 0,
  sumOriginal: 0,
  operationId: null,
  categoryName: '',
  transactionId: null,
  paidserviceId: null,
  paidserviceName: '',
  personalAccount: null,
};

export function setState(obj) {
  state = {
    ...state,
    ...obj,
  };
}
