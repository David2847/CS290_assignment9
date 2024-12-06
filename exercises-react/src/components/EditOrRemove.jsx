import { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

function EditOrRemove({ exercise, onDelete, onEdit }) {
    return (
        <>
            <MdDelete onClick={() => onDelete(exercise._id)} />
            &nbsp; &nbsp; &nbsp; &nbsp;
            <MdEdit onClick={() => onEdit(exercise)} />
        </>
    );
}

export default EditOrRemove;