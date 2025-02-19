// // import React, { useState } from 'react';

// // const FileUploadComponent = ({ apiEndpoint }) => {
// //   const [file, setFile] = useState(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(false);

// //   const handleFileChange = (event) => {
// //     const selectedFile = event.target.files[0];
// //     setFile(selectedFile);
// //     setError(null); // Reset error on new file selection
// //   };

// //   const handleUpload = async () => {
// //     if (!file) {
// //       setError('Please select a file.');
// //       return;
// //     }

// //     setUploading(true);
// //     setError(null);
// //     setSuccess(false);

// //     const formData = new FormData();
// //     formData.append('file', file, file.name); // Include original file name

// //     try {
// //       const response = await fetch(apiEndpoint, {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       if (!response.ok) {
// //         throw new Error('Upload failed. Please try again.');
// //       }

// //       const result = await response.json();
// //       console.log('Upload successful:', result);
// //       setSuccess(true);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   if (!apiEndpoint || typeof apiEndpoint !== 'string') {
// //     console.error('Invalid API endpoint:', apiEndpoint);
// //     return null;
// //   }

// //   return (
// //     <div>
// //       <input type="file" onChange={handleFileChange} disabled={uploading} />
// //       <button onClick={handleUpload} disabled={uploading || !file}>
// //         {uploading ? 'Uploading...' : 'Upload'}
// //       </button>
// //       {error && <p style={{ color: 'red' }}>{error}</p>}
// //       {success && <p style={{ color: 'green' }}>Upload successful!</p>}
// //     </div>
// //   );
// // };

// // export default FileUploadComponent;
// import React, { useState } from 'react';

// const FileUploadForm = () => {
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleTitleChange = (event) => {
//     setTitle(event.target.value);
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setUploading(true);

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('title', title);
//     formData.append('description', description);

//     fetch('https://your-api-endpoint.com/upload', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.error(error))
//       .finally(() => setUploading(false));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleFileChange} />
//       <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" />
//       <textarea value={description} onChange={handleDescriptionChange} placeholder="Description" />
//       <button type="submit" disabled={uploading}>
//         {uploading ? 'Uploading...' : 'Upload'}
//       </button>
//     </form>
//   );
// };

// export default FileUploadForm;