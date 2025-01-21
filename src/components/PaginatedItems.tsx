import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ModalContent from "./ModalContent";
import RowItem from "./RowItem";

interface PaginatedItemsProps {
	itemsPerPage: number; // Define the type for itemsPerPage
}

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

interface Event {
	selected: number;
}

function PaginatedItems({ itemsPerPage }: PaginatedItemsProps) {
	const [apiData, setApiData] = useState<Product[]>([]);
	const [isUpdate, setIsUpdate] = useState<boolean>(false);
	const hasFetched = useRef(false);
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [modalData, setModalData] = useState<Product | null>(null);

	function openModal(product?: Product) {
		console.log(product, "is product");
		if (product) {
			setIsUpdate(true);
		} else {
			setIsUpdate(false);
		}
		setModalData(product || null);
		setModalIsOpen(true);
		document.body.style.overflow = "hidden";
	}

	function closeModal() {
		setModalIsOpen(false);
		setModalData(null);
		document.body.style.overflow = "auto";
	}
	const fetchProducts = async () => {
		if (hasFetched.current) return; // Prevent duplicate calls
		hasFetched.current = true;

		const res = await fetch("https://api.escuelajs.co/api/v1/products");
		const data = await res.json();
		setApiData((prev) => [...prev, ...data]);
		console.log("api data is ", apiData);
		console.log(data, "is data");
	};

	const handleUpdate = (updatedProduct: Product) => {
		setApiData((prev) =>
			prev.map((item) =>
				item.id === updatedProduct.id ? updatedProduct : item
			)
		);
		closeModal();
	};

	const handleSave = (updatedProduct: Product) => {
		setApiData((prev) => [...prev, updatedProduct]);
		closeModal();
	};
	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		console.log(apiData, "is list of items");
	}, [apiData]);

	const deleteItem = async (id: number) => {
		try {
			const requestOptions = {
				method: "DELETE",
			};
			const response = await fetch(
				`https://api.escuelajs.co/api/v1/products/${id}`,
				requestOptions
			);
			setApiData(apiData.filter((item) => item.id !== id));
			if (response.ok) {
				setApiData(apiData.filter((item) => item.id !== id));
				console.log("Deleted Succesfully !");
			} else {
				console.log("Some error occured !");
			}
			console.log(response, "is respons");
		} catch {
			console.error("Some error occured.");
		}
	};

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + itemsPerPage;
	console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	const newItems = apiData.slice(itemOffset, endOffset);
	console.log(newItems, "is new items");
	const pageCount = Math.ceil(apiData.length / itemsPerPage);

	// Invoke when user click to request another page.
	const handlePageClick = (event: Event) => {
		console.log(event, "is event");
		console.log(event.selected, "is selected event");
		const newOffset = (event.selected * itemsPerPage) % apiData.length;
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		);
		setItemOffset(newOffset);
	};

	return (
		<>
			<div>
				<div className="flex justify-between mb-10 items-center">
					<h1 className="font-bold text-[50px]">List of Products</h1>
					<button
						className="p-2 bg-purple-700 h-[50px] text-white rounded-lg"
						onClick={() => openModal()}
					>
						Add Products
					</button>
				</div>
			</div>
			<div className="">
				<table className="w-full">
					<tr className="sticky top-0  bg-slate-300 text-left h-[50px] border-b-2 border-solid border-black z-20">
						<th className="w-3/6 pl-3">NAME</th>
						<th className="w-1/6 pl-3">CATEGORY</th>
						<th className="w-1/6 pl-3">PRICE</th>
						<th className="w-1/6 pl-3">ID</th>
						<th className="w-1/6 pl-3"></th>
					</tr>
					<tbody className="overflow-auto h-[calc(100vh-500px)]">
						{/* {newItems?.map((item) => generateRow(item))} */}
						{newItems?.map((newItem) => (
							<RowItem
								item={newItem}
								openModal={openModal}
								deleteItem={deleteItem}
							/>
						))}
					</tbody>
				</table>
			</div>
			<div className="sticky bottom-0 py-3 left-0 bg-white z-20">
				<ReactPaginate
					breakLabel="..."
					nextLabel="Next"
					onPageChange={handlePageClick}
					pageRangeDisplayed={3}
					pageCount={pageCount}
					previousLabel="Previous"
					renderOnZeroPageCount={null}
					containerClassName="flex justify-center items-center space-x-2 mt-4"
					pageClassName="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
					pageLinkClassName="text-gray-600"
					previousClassName="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
					previousLinkClassName="text-gray-600"
					nextClassName="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
					nextLinkClassName="text-gray-600"
					breakClassName="px-4 py-2 rounded border border-gray-300 bg-gray-50"
					breakLinkClassName="text-gray-600"
					activeClassName="bg-purple-200 text-white"
				/>
			</div>
			<div>
				<ModalContent
					isOpen={modalIsOpen}
					onClose={closeModal}
					data={modalData}
					onSave={isUpdate ? handleUpdate : handleSave}
				/>
			</div>
		</>
	);
}

export default PaginatedItems;
