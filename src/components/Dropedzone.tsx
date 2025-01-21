import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropedzoneProps {
	className: string;
}

function Dropedzone({ className }: DropedzoneProps) {
	const [files, setFiles] = useState([]);
	const onDrop = useCallback(
		(acceptedFiles) => {
			console.log(acceptedFiles, "is accepted file");
			acceptedFiles.map((file) => {
				setFiles((prev) => [...prev, file]);
			});
			// Do something with the files
		},
		[files]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div {...getRootProps({ className })}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drag 'n' drop some files here, or click to select files</p>
			)}
			<h1>{files}</h1>
		</div>
	);
}
export default Dropedzone;
