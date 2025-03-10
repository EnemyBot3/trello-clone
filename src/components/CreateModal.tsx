/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { default as cn } from "classnames";


interface CreateModalProps {
	isOpen: boolean;
	onClose: () => void;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleCreateColumn: (columnName: any) => void;
}

const CreateModal = ({ isOpen, onClose, setOpen, handleCreateColumn }: CreateModalProps) => {

	const [columnName, setColumnName] = useState("");

	const closeModal = () => {
		setOpen(false);
		onClose();
		setColumnName("");
	};

	const handleSubmit = () => {
		handleCreateColumn(columnName);
		closeModal();
	};

	return (
		<div
			className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
				isOpen ? "grid" : "hidden"
			}`}
		>
			<div
				className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
				onClick={closeModal}
			></div>

			<div className={cn(
                "flex flex-col items-center gap-3 px-5 py-6",
                "md:w-[30vw] md:min-w-[350px] md:mr-0 md:mt-0",
                "bg-white rounded-lg shadow-md z-50", 
                "w-[80%] ml-10 mt-16",
            )}>
				<input
					type="text"
					name="Name"
					value={columnName}
					onChange={e => setColumnName(e.target.value)}
					placeholder="Column Name"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
				/>
				
				<button
					className="w-full mt-3 rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
					onClick={handleSubmit}
				>
					Create Column
				</button>
			</div>
		</div>
	);
};

export default CreateModal;