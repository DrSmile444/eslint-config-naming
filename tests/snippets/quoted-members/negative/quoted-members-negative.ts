const headersWithBadName = {
  'Content-Type': 'application/json', // Quoted - allowed
  Bad_Header_Name: 'value', // Unquoted mixed case - not allowed
};

