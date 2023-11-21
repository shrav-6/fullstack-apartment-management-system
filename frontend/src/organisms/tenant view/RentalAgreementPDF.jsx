/* import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useLocation } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function RentalAgreementPDF() {
  const location = useLocation();
  const rentalAgreementText = location.state?.rentalAgreementText;
  console.log('rental agreement text', rentalAgreementText);
  return (
    <div>
      <h1>View Agreement</h1>
      {rentalAgreementText ? (
        <RentalAgreementPDF rentalAgreementText={rentalAgreementText} />
      ) : (
        <p>No PDF file specified.</p>
      )}
    </div>
  );
}

export default RentalAgreementPDF;
*/
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function RentalAgreementPDF({ rentalAgreementText }) {
  if (!rentalAgreementText) {
    return null; // Render nothing if rentalAgreementText is not available
  }

  return (
    <div>
      <Document>
        <Page>
          <div style={{ margin: '20px' }}>
            <pre>{rentalAgreementText}</pre>
          </div>
        </Page>
      </Document>
    </div>
  );
}

export default RentalAgreementPDF;
