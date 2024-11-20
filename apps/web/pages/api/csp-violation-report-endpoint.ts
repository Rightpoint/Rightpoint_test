import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

const connectionString ="DefaultEndpointsProtocol=https;AccountName=rpisteamsstorageacc;AccountKey=oeSL+aeiFxsmRVBEYqq0EJryoksRCsWY9xt0q/faw5FTCpSj3XcQixCp25SkwuIhH03NQzXj2ykV+AStiQFmyw==;EndpointSuffix=core.windows.net";
 // Using the connection string from environment variables
const containerName = 'rp-temp';

// Initialize BlobServiceClient using the connection string
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

async function uploadToBlobStorage(report) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = `report-${uuidv4()}.json`; // Generate unique filename
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const reportContent = JSON.stringify(report);
  await blockBlobClient.upload(reportContent, reportContent.length);
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const report = req.body;
    await uploadToBlobStorage(report); // Upload the report to Azure Blob Storage
    console.log("CSP Violation Report:", report);
    res.status(204).end();
  } else if (req.method === 'GET') {
    res.status(200).send('Fetching reports directly from Azure Blob Storage is not implemented yet.');
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
