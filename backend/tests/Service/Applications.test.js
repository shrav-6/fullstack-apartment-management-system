const applicationService = require('../../Service/Applications');
const dataLayer = require('../../Data/Applications');

jest.mock('../../Data/Applications');

/**
 * Test suite for the 'createApplication' function in the application service.
 * It tests the functionality of creating a new application.
 */
describe('createApplication', () => {
  /**
   * Test case to ensure that a new application is created successfully.
   * It mocks the data layer's response and verifies that the service
   * correctly interacts with the data layer and returns expected result.
   */
  it('should create a new application', async () => {
    const mockApplication = { listingId: 101, applicantName: 'John Doe' };
    const userId = 1;
    dataLayer.createApplication.mockResolvedValue({ success: true, message: 'Application created' });

    const result = await applicationService.createApplication(mockApplication, userId);
    expect(dataLayer.createApplication).toHaveBeenCalledWith(mockApplication, userId);
    expect(result).toEqual({ success: true, message: 'Application created' });
  });

  
});

/**
 * Test suite for the 'acceptRejectApplication' function in the application service.
 * It tests the functionality to accept or reject an application.
 */
describe('acceptRejectApplication', () => {
  /**
   * Test case to verify the acceptance of an application.
   * It mocks the successful acceptance in the data layer and
   * asserts that the service returns the correct response.
   */
  it('should accept an application', async () => {
    const applicationId = 101;
    const status = 'accept';
    const userId = 2;  // Assuming 2 is the manager's ID
    dataLayer.acceptRejectApplication.mockResolvedValue({ success: true, message: 'Application accepted' });

    const result = await applicationService.acceptRejectApplication(applicationId, status, userId);
    expect(dataLayer.acceptRejectApplication).toHaveBeenCalledWith(applicationId, status, userId);
    expect(result).toEqual({ success: true, message: 'Application accepted' });
  });

  
});
/**
 * Test suite for 'getAllApplicationsForListing' in the application service.
 * It tests retrieving all applications associated with a specific listing.
 */
describe('getAllApplicationsForListing', () => {

    /**
   * Test case to ensure that all applications for a specific listing are retrieved.
   * It mocks a successful data retrieval and checks if the service correctly
   * returns the list of applications.
   */
  it('should return all applications for a specific listing', async () => {
    const listingId = 123;
    const userId = 1;
    const mockApplications = [{ id: 101, applicantName: 'John Doe' }];
    dataLayer.getAllApplicationsForListing.mockResolvedValue({ success: true, message: 'Applications retrieved', data: mockApplications });

    const result = await applicationService.getAllApplicationsForListing(listingId, userId);
    expect(dataLayer.getAllApplicationsForListing).toHaveBeenCalledWith(listingId, userId);
    expect(result).toEqual({ success: true, message: 'Applications retrieved', data: mockApplications });
  });

});
/**
 * Test suite for 'getApplicationById' in the application service.
 * It tests the retrieval of a specific application by its ID.
 */
describe('getApplicationById', () => {
    /**
   * Test case to ensure that an application is correctly retrieved by its ID.
   * It mocks the data layer to return a specific application and verifies
   * if the service returns the correct application data.
   */
  it('should return a specific application by ID', async () => {
    const applicationId = 101;
    const userId = 1;
    const mockApplication = { id: 101, applicantName: 'John Doe' };
    dataLayer.getApplicationById.mockResolvedValue({ success: true, message: 'Application found', data: mockApplication });

    const result = await applicationService.getApplicationById(applicationId, userId);
    expect(dataLayer.getApplicationById).toHaveBeenCalledWith(applicationId, userId);
    expect(result).toEqual({ success: true, message: 'Application found', data: mockApplication });
  });

  
});
/**
 * Test suite for 'getAllApplications' in the application service.
 * It tests the functionality of retrieving all applications.
 */
describe('getAllApplications', () => {
   /**
   * Test case to ensure that all applications are correctly retrieved.
   * It checks if the service successfully returns the complete list of applications.
   */
  it('should return all applications', async () => {
    const userId = 1;
    const mockApplications = [{ id: 101, applicantName: 'John Doe' }, { id: 102, applicantName: 'Jane Smith' }];
    dataLayer.getAllApplications.mockResolvedValue({ success: true, message: 'All applications retrieved', data: mockApplications });

    const result = await applicationService.getAllApplications(userId);
    expect(dataLayer.getAllApplications).toHaveBeenCalledWith(userId);
    expect(result).toEqual({ success: true, message: 'All applications retrieved', data: mockApplications });
  });

  
});
