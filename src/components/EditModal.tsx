/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getRandomColors } from "../helpers/getRandomColors";
import { TaskT } from "../assets/types/types";
import { Pencil, TrashBin } from "react-ionicons";
import { default as cn } from "classnames";

interface Tag {
	title: string;
	bg: string;
	text: string;
}

interface EditModalProps {
	isOpen: boolean;
	onClose: () => void;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleEditTask: (taskData: any) => void;
	handleDeleteTask: (taskData: any) => void;
	selectedTask: TaskT
}

const EditModal = ({ isOpen, onClose, setOpen, handleEditTask, handleDeleteTask, selectedTask}: EditModalProps) => {

	const [taskData, setTaskData] = useState(selectedTask);
	const [tagTitle, setTagTitle] = useState("");
	useEffect(() => setTaskData(selectedTask), [selectedTask])

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setTaskData({ ...taskData, [name]: value });
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const reader = new FileReader();
			reader.onload = function (e) {
				if (e.target) {
					setTaskData({ ...taskData, image: e.target.result as string });
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const handleAddTag = () => {
		if (tagTitle.trim() !== "") {
			const { bg, text } = getRandomColors();
			const newTag: Tag = { title: tagTitle.trim(), bg, text };
			setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
			setTagTitle("");
		}
	};

	const closeModal = () => {
		setOpen(false);
		onClose();
	};

	// const handleSubmit = () => {
	// 	handleAddTask(taskData);
	// 	closeModal();
	// };

	if (Object.keys(taskData).length === 0) {
		return <></>
	}

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
					name="title"
					value={taskData.title}
					onChange={handleChange}
					placeholder="Title"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
				/>
				<input
					type="text"
					name="description"
					value={taskData.description}
					onChange={handleChange}
					placeholder="Description"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
				/>
				<select
					name="priority"
					onChange={handleChange}
					value={taskData.priority}
					className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
				>
					<option value="">Priority</option>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
				<input
					type="number"
					name="deadline"
					value={taskData.deadline}
					onChange={handleChange}
					placeholder="Deadline"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
				/>
				<input
					type="text"
					value={tagTitle}
					onChange={(e) => setTagTitle(e.target.value)}
					placeholder="Tag Title"
					className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
				/>
				<button
					className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
					onClick={handleAddTag}
				>
					Add Tag
				</button>
				<div className="w-full">
					{taskData.tags && <span>Tags:</span>}
					{taskData.tags.map((tag, index) => (
						<div
							key={index}
							className="inline-block mx-1 px-[10px] py-[2px] text-[13px] font-medium rounded-md"
							style={{ backgroundColor: tag.bg, color: tag.text }}
						>
							{tag.title}
						</div>
					))}
				</div>
				<div className="w-full flex items-center gap-2 justify-between">
					Image: 
					<input
						type="file"
						name="image"
						accept="image/png, image/jpeg"
						onChange={handleImageChange}
						className="w-full"
						/>
				</div>
				{taskData.image && (
					<img
					src={taskData.image}
					className="w-full h-[170px] rounded-lg"
					/>
				)}
				<div className="flex items-center justify-center gap-2 w-full">
					<button
						className={cn(
							"flex items-center justify-center gap-2",
							"w-full mt-3 rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
						)}
						onClick={() => handleEditTask(taskData)}
					>
						<Pencil color="white"/>
						Edit Task
					</button>
					<button
						className={cn(
							"flex items-center justify-center gap-2",
							"w-full mt-3 rounded-md h-9 bg-red-400 text-blue-50 font-medium"
						)}
						onClick={() => handleDeleteTask(taskData)}
					>
						<TrashBin color="white"/>
						Delete Task
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditModal;