
import PropTypes from "prop-types"
arrayBufferToBase64.propTypes={
    arrayBuffer:PropTypes.any.isRequired,
}
readBinaryData.propTypes={
    file:PropTypes.any.isRequired,
}
getImageBlobUrl.propTypes={
  extension:PropTypes.string.isRequired,
  fileBinary:PropTypes.string.isRequired
  
}
//This function encodes a binary ArrayBuffer to Base64
export function arrayBufferToBase64(arrayBuffer) {
    // Step 1: Convert ArrayBuffer to Uint8Array
    const uint8Array = new Uint8Array(arrayBuffer);
  
    // Step 2: Encode Uint8Array as base64
    let binary = '';
    uint8Array.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
  
    return btoa(binary);
  }

  //This function extracts the binary of a File
export function readBinaryData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryData = event.target.result;
        resolve(binaryData);
      };
      reader.readAsArrayBuffer(file);
    });
}

//This function converts a blob URL To a file
export async function convertBlobUrlToFile(blobUrl, fileName) {
  try {
    // Fetch the Blob data from the URL
    const response = await fetch(blobUrl);
    const blobData = await response.blob();

    // Create a new File from the Blob data
    const file = new File([blobData], fileName);

    return file;
  } catch (error) {
    console.error("Error converting Blob URL to File: ", error);
    return null;
  }
}

//This function extracts a blolb URL's fileName

export function getFileNameFromBlobUrl(blobUrl) {
  const urlParts = blobUrl.split('/');
  const fileName = urlParts.pop();
  return fileName;
}

//This function gusses the file extension from the ArrayBuffer
export function getFileExtensionFromArrayBuffer(arrayBuffer) {
  // Define a mapping of common file type signatures and their corresponding extensions
  const fileSignatures = {
    '89504E47': 'png',   // PNG
    '47494638': 'gif',   // GIF
    '25504446': 'pdf',   // PDF
    'FFD8FFE0': 'jpeg',  // JPEG (JFIF)
    'FFD8FFE1': 'jpeg',  // JPEG (Exif)
    '89504E470D0A1A0A': 'png', // PNG (alternate signature)
    '504B0304': 'zip',   // ZIP archive
    '504B0506': 'zip',   // ZIP archive (alternate signature)
    '52617221': 'rar',   // RAR archive
    'FFD8FFDB': 'jpeg',  // JPEG (JPEG Interchange Format)
    '424D': 'bmp',        // BMP
    '474946383961': 'gif', // GIF (version 89a)
    '52494646': 'webp',   // WebP
    'FF575043': 'webp',   // WebP (lossless)
    'FFD8FFE000104A46':'jpg'
    // Add more signatures and extensions as needed
  };

  // Create a DataView from the ArrayBuffer to read bytes
  const dataView = new DataView(arrayBuffer);

  // Get the first 8 bytes (or adjust as needed)
  const signatureBytes = Array.from(
    { length: 8 },
    (_, index) => dataView.getUint8(index).toString(16).padStart(2, '0')
  ).join('').toUpperCase();
  // Determine the file extension
  const fileExtension = fileSignatures[signatureBytes] || 'unknown';

  return fileExtension;
}


export function getImageBlobUrl(extension,fileBinary) {
  return new Promise((resolve, reject) => {
    // Convert the binary string to a Blob
    const byteCharacters = atob(fileBinary);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: `image/${extension}` });
    // Create a data URL from the Blob
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);

    if (imageUrl) {
      resolve(imageUrl);
    } else {
      reject(new Error('Failed to create Blob URL.'));
    }
  });
}

export default getImageBlobUrl;

  

