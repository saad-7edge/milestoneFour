import PaginatedItems from "../components/PaginatedItems";

function HomeScreen() {
	return (
		<div className="p-5 justify-center">
			<PaginatedItems itemsPerPage={10} />
		</div>
	);
}

export default HomeScreen;
