interface RowItemProps{
    item:Product;
    openModal:(item:Product)=>void;
    deleteItem:(id:number)=>void;
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
const RowItem = ({item,openModal,deleteItem}:RowItemProps) => {
		return (
			<tr
				key={item.id}
				className="h-[50px] border-b-[1px] border-solid border-black "
			>
				<td className="pl-3 w-3/6 min-w-[500px] ">
					<div className="flex">
						<div className="h-[50px] w-[50px] border-2 rounded-full overflow-hidden flex-shrink-0">
							<img
								src={item?.images[0]}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="text-clip overflow-hidden whitespace-nowrap flex-grow">
							{item.title}
						</div>
					</div>
				</td>
				<td className="w-1/6 pl-3">
					{item.category ? item.category["name"] : null}
				</td>
				<td className="w-1/6 pl-3">{item.price}</td>
				<td className="w-1/6 pl-3">{item.id}</td>
				<td className="w-1/6 pl-3 pr-3 sticky right-0 bg-white z-10">
					<div className="flex gap-x-5 items-center">
						<h3
							className="text-orange-600 cursor-pointer"
							onClick={() => openModal(item)}
						>
							Edit
						</h3>
						<i
							className="fa fa-times-circle cursor-pointer"
							aria-hidden="true"
							onClick={() => deleteItem(item.id)}
						></i>
					</div>
				</td>
			</tr>
		);
	};

    export default RowItem;