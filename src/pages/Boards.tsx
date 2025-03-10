/* eslint-disable @typescript-eslint/no-explicit-any */
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { Board } from "../assets/data/board";
import { Columns, TaskT } from "../assets/types/types";
import { onDragEnd } from "../helpers/onDragEnd";
import { Add, TrashBin } from "react-ionicons";
import AddModal from "../components/AddModal";
import Task from "../components/Task";
import { default as cn } from "classnames";
import EditModal from "../components/EditModal";
import CreateModal from "../components/CreateModal";
import InputOnClick from "../components/InputOnClick";

const Home = () => {
	const [columnOrder, setColumnOrder] = useState(Object.keys(Board));
	const [columns, setColumns] = useState<Columns>(Board);
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [selectedColumn, setSelectedColumn] = useState("");
	const [selectedTask, setSelectedTask] = useState("");
	const [isDragging, setIsDragging] = useState(false);


	// open add modal within selected column
	const openAddModal = (columnId: any) => {
		setSelectedColumn(columnId);
		setAddModalOpen(true);
	};

	// open edit modal with task data
	const openEditModal = (taskId: any, columnId: any) => {
		setSelectedColumn(columnId);
		setSelectedTask(taskId);
		setEditModalOpen(true);
	};

	// close modals
	const closeModal = () => {
		setAddModalOpen(false);
		setEditModalOpen(false)
		setCreateModalOpen(false)
	};

	// create new column
	const handleCreateColumn = (columnName: string) => {
		const columnId = columnName.toLowerCase().replace(/\s+/g, "-"); // generate id from name
		setColumns((prev) => ({
			...prev,
			[columnId]: {
				name: columnName,
				items: [],
			},
		}));
		setColumnOrder((prev) => [...prev, columnId]);
	};

	// adding new task to selected column
	const handleAddTask = (taskData: any) => {
		const newBoard = { ...columns };
		newBoard[selectedColumn].items.push(taskData);
	};

	// get task by id and column
	const handleSelectTask = (taskId: any) => {
		for (const column of Object.values(columns)) {
			const task = column.items.find((task) => task.id === taskId);
			if (task) return task;
		}
		return {} as TaskT
	};

	// editing task
	const handleEditTask = (taskData: any) => {
		const newBoard = { ...columns };
		newBoard[selectedColumn].items = newBoard[selectedColumn].items.map((task) =>
			task.id === taskData.id ? { ...task, ...taskData } : task
		);
		setColumns(newBoard);
		closeModal()
	};

	// deleting task
	// const handleDeleteTask = (taskId: string, columnId: string) => {
	// 	setColumns((prev) => {
	// 		const newBoard = { ...prev };
	// 		newBoard[columnId].items = newBoard[columnId].items.filter(task => task.id !== taskId);
	// 		return newBoard;
	// 	});
	// };
	const handleDeleteTask = (taskData: any) => {
		const newBoard = { ...columns };
		newBoard[selectedColumn].items = newBoard[selectedColumn].items.filter(
			(task) => task.id !== taskData.id
		);
		setColumns(newBoard);
		closeModal()
	};

	// deleting column
	const handleDeleteColumn = (columnId: string) => {
		setColumns((prev) => {
			const newBoard = { ...prev };
			delete newBoard[columnId]; // Remove column
			return newBoard;
		});
	
		setColumnOrder((prev) => prev.filter(id => id !== columnId)); // Remove from order
	};
	

	return (
		<>
			{/* drag and drop for board */}
			<DragDropContext 
				onDragStart={(e) => setIsDragging(e.type === "column")}
				onDragEnd={(result: any) => {
					setIsDragging(false);
					onDragEnd(result, columns, setColumns, setColumnOrder, handleDeleteColumn, handleDeleteTask)}
				}
			>
				<Droppable droppableId="columns" direction="horizontal" type="column">
					{(provided: any) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className="w-full flex items-start justify-between px-5 mr-3 pb-8 md:gap-3 gap-10"
						>
							{/* iterate each column */}
							{columnOrder.map((columnId: string, index: number) => (
								<Draggable key={columnId} draggableId={columnId} index={index}>
									{(provided: any) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className="w-full flex flex-col gap-0"
										>
											{/* droppable area for each column */}
											<Droppable key={columnId} droppableId={columnId}>
												{(provided: any) => (
													<div
														ref={provided.innerRef}
														{...provided.droppableProps}
														className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
													>
														{/* Column name */}
														{/* <div className={cn(
															"flex items-center justify-center", 
															"py-[10px] pr-2 w-full text-[#555] font-medium text-[15px]",
															"bg-white rounded-lg shadow-sm"
														)}>
															<div className="grow-[10] text-center pl-7">{columns[columnId].name}</div>
															<Add 
																color={"#555"} 
																onClick={() => openAddModal(columnId)}
																style={{cursor: 'pointer'}}
															/>
														</div> */}
														<InputOnClick 
															columnId={columnId} 
															columns={columns} 
															updateColumnName={(id: string, newName: string) => {
																setColumns({
																	...columns,
																	[id]: { ...columns[id], name: newName }
																});
															}}
															openAddModal={openAddModal} 
														/>

														{/* tasks within the column */}
														{columns[columnId].items.map((task: any, index: any) => (
															<Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
																{(provided: any) => (
																	<Task
																		provided={provided}
																		task={task}
																		columnId={columnId}
																		openEditModal={openEditModal}
																	/>
																)}
															</Draggable>
														))}

														{provided.placeholder}
													</div>
												)}
											</Droppable>
										</div>
									)}
								</Draggable>
							))}

							{provided.placeholder}

							{/* add new column */}
							<div 
								onClick={() => setCreateModalOpen(true)}
								className={cn(
									"flex items-center justify-center gap-3", 
									"md:min-w-[250px] min-w-[200px] my-5",
									"py-[10px] pr-2 text-[#555] font-medium text-[15px]",
									"cursor-pointer text-white font-black tracking-wide",
									"bg-white/30 border-2 border-dashed border-spacing-10 rounded-lg shadow-sm"
								)}
							>
								<div className="text-center pl-7">Add Column</div>
								<Add 
									color="white"
									style={{scale: '1.2'}}
								/>
							</div>

						</div>
					)}
				</Droppable>

				{/* Delete Zone */}
				<Droppable droppableId="delete-zone" type="column">
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className={cn(
								"flex items-center justify-center gap-2",
								"fixed bottom-10 right-10",
								"px-5 py-3 tracking-wide",
								"bg-red-500 text-white font-bold rounded-md shadow-lg",
								{"hidden": !isDragging}
							)}
						>
							<TrashBin color="white" style={{scale: '1.2'}}/>
							Delete Column
						</div>
					)}
				</Droppable>
				
			</DragDropContext>


			{/* new task modal */}
			<AddModal
				isOpen={addModalOpen}
				onClose={closeModal}
				setOpen={setAddModalOpen}
				handleAddTask={handleAddTask}
			/>

			{/* edit task modal */}
			<EditModal
				isOpen={editModalOpen}
				onClose={closeModal}
				setOpen={setEditModalOpen}
				selectedTask={handleSelectTask(selectedTask)}
				handleEditTask={handleEditTask}
				handleDeleteTask={handleDeleteTask}
			/>

			{/* create column modal */}
			<CreateModal 
				isOpen={createModalOpen}
				onClose={closeModal}
				setOpen={setCreateModalOpen}
				handleCreateColumn={handleCreateColumn}
			/>

		</>
	);
};

export default Home;
