import React, { useEffect, useRef, useState } from "react";
import Select, { SingleValue } from "react-select";

// interface Category {
// 	name: string;
// 	id: number;
// }

interface DropDownProps {
	onChange: (option: Option | null) => void; // Allow null for deselection
	value: Option | null;
}

interface Option {
	value: number;
	label: string;
}
function DropDown({ onChange, value }: DropDownProps) {
	const hasFetched = useRef(false);
	// const [state, setState] = useState(null);
	const [options, setOptions] = useState([]);
	const fetchOptions = async () => {
		if (hasFetched.current) return; // Prevent duplicate calls
		hasFetched.current = true;
		const res = await fetch("https://api.escuelajs.co/api/v1/categories");
		const data = await res.json();
		setOptions(
			data.map((item: { id: number; name: string }) => ({
				value: item.id,
				label: item.name,
			}))
		);
		console.log(data, "is options data");
	};

	// const handleChange = (item) => {
	// 	if (category) {
	// 		category.name = "";
	// 	}
	// 	setState(item);
	// };
	const handleChange = (newValue: SingleValue<Option>) => {
		console.log(newValue, "is item in dropdown");
		onChange(newValue);
	};

	useEffect(() => {
		fetchOptions();
	}, []);

	return (
		<Select
			options={options}
			value={value}
			onChange={handleChange}
			placeholder="Select an option"
			styles={{
				option: (provided, state) => ({
					...provided,
					color: state.isSelected ? "white" : "black", // Change the default text color
					backgroundColor: state.isSelected ? "black" : "white",
					"&:hover": {
						color: "black", // Change text color on hover
						backgroundColor: "lightgray",
					},
				}),
				singleValue: (provided) => ({
					...provided,
					color: "black", // Customize the text color for the selected value
				}),
				placeholder: (provided) => ({
					...provided,
					color: "gray", // Customize the placeholder text color
				}),
			}}
		/>
	);
}

export default DropDown;
