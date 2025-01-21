import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
	img?: string[];
	className: string;
	onFilesUpdate: (files: string[]) => void;
}
interface FileItem {
	name: string;
	preview: string;
	isNew: boolean;
}

function DropZone({ className, img = [], onFilesUpdate }: DropZoneProps) {
	const [files, setFiles] = useState<FileItem[]>([]);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const newFiles = acceptedFiles.map((file) => ({
				name: file.name,
				preview: URL.createObjectURL(file),
				isNew: true,
			}));

			setFiles((previousFiles) => {
				// Merge new and old files, ensuring no duplicates
				const allFiles = [...previousFiles, ...newFiles];
				const uniqueFiles = allFiles.filter(
					(file, index, self) =>
						index === self.findIndex((f) => f.preview === file.preview)
				);
				onFilesUpdate(uniqueFiles.map((file) => file.preview));
				return uniqueFiles;
			});
		},
		[onFilesUpdate]
	); 

	// useEffect(() => {
	// 	// Initialize with pre-existing images
	// 	const existingImages = img.map((image) => ({
	// 		name: image, // Use image URL as the name for simplicity
	// 		preview: image,
	// 		isNew: false,
	// 	}));
	// 	setFiles(existingImages);
	// }, [img]);
	useEffect(() => {
		// Initialize with pre-existing images
		const existingImages = img.map((image) => ({
			name: image, // Use image URL as the name for simplicity
			preview: image,
			isNew: false,
		}));
		setFiles(existingImages);
	}, []);

	const removeFile = (preview: string) => {
		setFiles((currentFiles) => {
			const updatedFiles = currentFiles.filter(
				(file) => file.preview !== preview
			);
			onFilesUpdate(updatedFiles.map((file) => file.preview));
			return updatedFiles;
		});
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<>
			<div {...getRootProps({ className })}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p>Drop the files here ...</p>
				) : (
					<p>Drag 'n' drop some files here, or click to select files</p>
				)}
			</div>

			{/* Preview */}
			<ul className="flex mt-2 gap-2">
				{files.map((file) => (
					<li key={file.preview}>
						<div className="relative">
							<img
								src={file.preview}
								alt={file.name}
								className="h-[100px] w-[100px] object-contain border border-gray-300 rounded"
							/>
							<i
								className="fa-solid fa-circle-xmark absolute -top-1 -right-1 cursor-pointer"
								onClick={() => removeFile(file.preview)}
							></i>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}

export default DropZone;
