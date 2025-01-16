import { useEffect, useState } from "react";
import DropDown from "./DropDown";
import DropZone from "./DropZone";
import Modal from "react-modal";
import { SingleValue } from "react-select";

interface Category {
	name: string;
	id: number;
}

interface Product {
	id: number;
	title: string;
	price: number;
	category: Category | null; // Add optional properties if necessary
	images: string[];
	description: string;
}

interface ModalContentProps {
	isOpen: boolean;
	onClose: () => void;
	data: Product | null;
	onSave: (updatedProduct: Product) => void;
}

function ModalContent({ isOpen, onClose, data, onSave }: ModalContentProps) {
	const [input, setInput] = useState({ title: "", price: 0, description: "" });
	const [selectedCategory, setSelectedCategory] = useState<{
		value: number;
		label: string;
	}>({ value: 1, label: "Clothes" });
	const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

	const handleFilesUpdate = (files: string[]) => {
		setUploadedFiles(files);
	};
	useEffect(() => {
		console.log(uploadedFiles, "is uploadd file");
		console.log(data, "is dataaa");
	});

	const handleCategoryChange = (
		selectedOption: SingleValue<{
			value: number;
			label: string;
		}>
	) => {
		if (data?.category) {
			data.category = null;
		}
		if (selectedOption) {
			setSelectedCategory({
				value: selectedOption.value, // Use the ID if available
				label: selectedOption.label,
			});
		}
	};

	const handleSave = () => {
		if (data) {
			onSave({
				id: data.id,
				title: input.title,
				price: input.price,
				category: { id: selectedCategory.value, name: selectedCategory.label },
				description: input.description,
				images: uploadedFiles,
			});
		} else {
			onSave({
				id: 89,
				title: input.title,
				price: +input.price,
				category: { id: selectedCategory.value, name: selectedCategory.label },
				description: input.description,
				images: uploadedFiles,
			});
		}
	};
	useEffect(() => {
		console.log(typeof onSave, "is type of on save");
		if (isOpen && data) {
			console.log(data, "is data in modal");
			setInput({
				title: data.title || "",
				price: data.price,
				description: data.description || "",
			});
		}
	}, [isOpen, data]);

	return (
		<>
			<Modal
				isOpen={isOpen}
				onRequestClose={onClose}
				contentLabel="Example Modal"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
				className="bg-white w-[90%] sm:w-[450px] h-auto min-h-[80%] max-h-[90%] rounded-lg shadow-lg overflow-hidden relative"
			>
				<div className="flex bg-gray-200 h-[50px] items-center justify-end pr-6 ">
					<button onClick={onClose}>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
					<div className="flex justify-between">
						<div className="flex-col">
							<h3>Title</h3>
							<input
								name="title"
								className="border border-gray-300 rounded p-2"
								onChange={(e) => {
									setInput((previous) => ({
										...previous,
										title: e.target.value,
									}));
								}}
								value={input.title}
							/>
						</div>
						<div className="flex-col">
							<h3>Price</h3>
							<input
								name="price"
								type="number"
								className="border border-gray-300 rounded p-2"
								onChange={(e) => {
									// const value = e.target.value;
									setInput((previous) => ({
										...previous,
										price: +e.target.value,
									}));
								}}
								value={input.price || ""}
							/>
						</div>
					</div>
					<div className="mt-[20px]">
						<h2>Category</h2>
						<DropDown
							onChange={handleCategoryChange}
							value={
								data?.category
									? { label: data.category.name, value: data.category.id }
									: selectedCategory
							}
						/>
					</div>
					<div className="mt-[20px]">
						<h2>Description</h2>
						<textarea
							className="border border-gray-300 rounded w-full h-[100px] p-2"
							onChange={(e) => {
								setInput((previous) => ({
									...previous,
									description: e.target.value,
								}));
							}}
							value={input.description}
						></textarea>
					</div>
					<div className="mt-[20px]">
						<h2>Cover Photo</h2>
						<DropZone
							className={
								"flex border border-gray-300 border-dashed rounded h-[100px] cursor-pointer justify-center items-center text-gray-400"
							}
							img={data?.images}
							onFilesUpdate={handleFilesUpdate}
						/>
					</div>
				</div>
				<div className="flex bg-gray-200 h-[50px] w-full items-center justify-end pr-6 ">
					<button onClick={handleSave}>Save Changes</button>
				</div>
			</Modal>
		</>
	);
}

export default ModalContent;
