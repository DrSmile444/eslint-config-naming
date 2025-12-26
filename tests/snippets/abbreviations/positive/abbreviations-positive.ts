// Valid names that avoid abbreviations from the DENY_LIST

function abbreviationsPositiveExample() {
  // Variables - full descriptive names
  const userData = { id: 1, name: 'Alice' }; // id is in ALLOW_LIST
  const apiUrl = 'https://example.com'; // api, url in ALLOW_LIST
  const userCount = 10; // not abbreviated
  const responseBody = { status: 'ok' }; // instead of "res"
  const errorMessage = 'Failed'; // instead of "err"
  const callback = () => {}; // instead of "cb"
  const element = document.createElement('div'); // instead of "el"
  const button = document.createElement('button'); // instead of "btn"
  const directory = '/home/user'; // instead of "dir"
  const filePath = '/home/user/file.txt'; // instead of "fpath"
  const configuration = { debug: true }; // instead of "cfg"
  const timestamp = Date.now(); // instead of "ts"
  const message = 'Hello'; // instead of "msg"
  const minimum = 0; // instead of "min"
  const maximum = 100; // instead of "max"
  const index = 0; // instead of "i", "j", "k", or "idx"
  const itemIndex = 1; // instead of "i"
  const rowIndex = 2; // instead of "j"

  return {
    userData,
    apiUrl,
    userCount,
    responseBody,
    errorMessage,
    callback,
    element,
    button,
    directory,
    filePath,
    configuration,
    timestamp,
    message,
    minimum,
    maximum,
    index,
    itemIndex,
    rowIndex,
  };
}

// Functions - descriptive names
function processUserData() {}
function handleErrorMessage() {}
function formatTimestamp() {}
function validateDirectory() {}

// Parameters - descriptive names
function processRequest(requestData: unknown, onComplete: () => void) {
  return { requestData, onComplete };
}

function handleResponse(responseData: unknown, metadata: unknown) {
  return { responseData, metadata };
}

