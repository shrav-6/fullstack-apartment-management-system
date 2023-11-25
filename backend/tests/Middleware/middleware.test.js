/**
 * Test suite for the 'validateToken' middleware function.
 */
const { validateToken } = require('../../Middleware/middleware');
const { sign, verify } = require('jsonwebtoken');

// Mocking the response objects
const mockRequest = () => {
  return {
    header: jest.fn(),
  };
};

const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Mocking the verify function
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('validateToken Middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
 * Test to verify the functionality with a valid access token.
 * Checks if the middleware correctly processes a valid token and populates the request with user information.
 */
  it('should pass with a valid accessToken', () => {
    const req = mockRequest();
    const res = mockResponse();
    req.header.mockReturnValue('valid_token');
    verify.mockReturnValueOnce({ sub: 'user_id' });

    validateToken(req, res, () => {});

    expect(req.user).toBeDefined();
    expect(req.user).toHaveProperty('sub');
    expect(req.user.sub).toBe('user_id');
  });

  /**
 * Test to handle the scenario where an access token is not provided.
 * Ensures that the middleware responds with an error message indicating the user is not logged in.
 */
  it('should handle error when accessToken is not provided', () => {
    const req = mockRequest();
    const res = mockResponse();

    validateToken(req, res, () => {});

    expect(res.json).toHaveBeenCalledWith({ error: 'User not logged in!' });
  });

  /**
 * Test to handle the scenario where an invalid access token is provided.
 * Verifies that the middleware responds with an appropriate error message for an invalid token.
 */
  it('should handle error when accessToken is invalid', () => {
    const req = mockRequest();
    const res = mockResponse();
    req.header.mockReturnValue('invalid_token');
    verify.mockImplementationOnce(() => {
      throw new Error('jwt malformed');
    });

    validateToken(req, res, () => {});

    expect(res.json).toHaveBeenCalledWith({ error: expect.any(Error) }); // Updated expectation
  });

  /**
 * Test to handle the scenario where access token verification fails.
 * Checks if the middleware responds correctly with an error message when token verification fails.
 */
  it('should handle error when accessToken verification fails', () => {
    const req = mockRequest();
    const res = mockResponse();
    req.header.mockReturnValue('valid_but_malformed_token');
    verify.mockImplementationOnce(() => {
      throw new Error('invalid token');
    });

    validateToken(req, res, () => {});

    expect(res.json).toHaveBeenCalledWith({ error: expect.any(Error) }); // Updated expectation
  });

  
});
