const jwt = jest.requireActual('jsonwebtoken');

// Existing mock for 'verify'
jwt.verify = jest.fn().mockImplementation((token, secret) => {
  if (token === "valid_token") {
    return { id: 1, role: "Manager" };
  }
 else if (token === 'valid_tenant_token') {
  return { id: 1, role: "Tenant" };
} 
else if (token === 'invalid_tenant_token') {
  return { id: 1, role: "Manager",buildingId:5, };
}
else if(token==='invalid_manager_token')
{
  return {id: 1,role:"Tenant"}
}
else {
  throw new Error("Invalid token");
}
});

// Add mock for 'sign'
jwt.sign = jest.fn().mockReturnValue('test_token');

module.exports = jwt;
