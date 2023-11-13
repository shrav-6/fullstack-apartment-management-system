import http from './http';

const upload = (file, onUploadProgress) => {
  const formData = new FormData();

  formData.append('file', file);

  return http.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};

const getFiles = () => http.get('/files');

const FileUploadService = {
  upload,
  getFiles,
};

export default FileUploadService;
