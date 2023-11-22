const { validateToken } = require('../../Middleware/Middleware');
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

  it('should handle error when accessToken is not provided', () => {
    const req = mockRequest();
    const res = mockResponse();

    validateToken(req, res, () => {});

    expect(res.json).toHaveBeenCalledWith({ error: 'User not logged in!' });
  });

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

  // Add more test cases for various scenarios
});
