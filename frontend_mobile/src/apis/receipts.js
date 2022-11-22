import api from "./api";

function fetchOcrReceipts(path, success, fail) {
  api
    .post(`/receipts/ocr/`, {
      path,
    })
    .then(success)
    .catch(fail);
}

export { fetchOcrReceipts };
