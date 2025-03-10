import { useState } from "react";
import { Add } from "react-ionicons";

interface InputOnClickProps{
    columnId: any, 
    columns: any,
    updateColumnName: any,
    openAddModal: any
}

const InputOnClick = ({ columnId, columns, updateColumnName, openAddModal }:  InputOnClickProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [columnName, setColumnName] = useState(columns[columnId].name);

    const handleInputChange = (e: any) => {
        setColumnName(e.target.value);
    };

    // update column name on eneter
    const handleBlurOrEnter = () => {
        setIsEditing(false);
        updateColumnName(columnId, columnName);
    };

    return (
        <div
            className="flex items-center justify-center py-[10px] px-2 w-full text-[#555] font-medium text-[15px] bg-white rounded-lg shadow-sm"
            onClick={() => setIsEditing(true)}
        >
            {isEditing ? (
                <input
                    type="text"
                    value={columnName}
                    onChange={handleInputChange}
                    onBlur={handleBlurOrEnter}
                    onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter()}
                    autoFocus
                    className="grow-[10] text-center pl-7 border rounded px-2 py-1 outline-none"
                />
            ) : (
                <div className="grow-[10] text-center pl-7">{columnName}</div>
            )}
            <Add 
                color={"#555"} 
                onClick={(e: any) => {
                    e.stopPropagation(); // Prevent triggering edit mode when clicking the button
                    openAddModal(columnId);
                }}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
};

export default InputOnClick