const applicationService = require('../../Service/Applications');
const dataLayer = require('../../Data/Applications');

jest.mock('../../Data/Applications');

describe('createApplication', () => {
  it('should create a new application', async () => {
    const mockApplication = { listingId: 101, applicantName: 'John Doe' };
    const userId = 1;
    dataLayer.createApplication.mockResolvedValue({ success: true, message: 'Application created' });

    const result = await applicationService.createApplication(mockApplication, userId);
    expect(dataLayer.createApplication).toHaveBeenCalledWith(mockApplication, userId);
    expect(result).toEqual({ success: true, message: 'Application created' });
  });

  
});

describe('acceptRejectApplication', () => {
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

describe('getAllApplicationsForListing', () => {
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

describe('getApplicationById', () => {
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

describe('getAllApplications', () => {
  it('should return all applications', async () => {
    const userId = 1;
    const mockApplications = [{ id: 101, applicantName: 'John Doe' }, { id: 102, applicantName: 'Jane Smith' }];
    dataLayer.getAllApplications.mockResolvedValue({ success: true, message: 'All applications retrieved', data: mockApplications });

    const result = await applicationService.getAllApplications(userId);
    expect(dataLayer.getAllApplications).toHaveBeenCalledWith(userId);
    expect(result).toEqual({ success: true, message: 'All applications retrieved', data: mockApplications });
  });

  
});
