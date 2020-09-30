import React from 'react';
import './NoteDetail.css';

function NoteDetail(props) {
    const {note} = props;
    if(note !== ''){
        return (
            <div>
                <h2>{note.title}</h2>
                <p>Category: {note.category} - Date: {note.date}</p>
                <span>{note.description}</span>
            </div>
        );
    }else{
        return null;
    }
}

export default NoteDetail;