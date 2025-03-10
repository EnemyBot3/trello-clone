// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onDragEnd = (
    result: any,
    columns: any,
    setColumns: any,
    setColumnOrder: any,
    handleDeleteColumn: any,
) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

	// Check if dropped in the delete zone
	if (destination.droppableId === "delete-zone") {
		if (type === "column") {
			handleDeleteColumn(draggableId);
		}
		return;
	}

    if (type === "column") {
        // Get current column order
        const columnEntries = Object.entries(columns);
        const [movedColumn] = columnEntries.splice(source.index, 1);
        columnEntries.splice(destination.index, 0, movedColumn);

        // Convert back to object
        const newColumns = Object.fromEntries(columnEntries);
        
        // Update both state variables
        setColumns(newColumns);
        setColumnOrder(Object.keys(newColumns));
    } else {
        // Reorder tasks within or between columns
        if (source.droppableId !== destination.droppableId) {

            // Moving task between different columns
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            // Rearranging task within the same column
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    }
};

