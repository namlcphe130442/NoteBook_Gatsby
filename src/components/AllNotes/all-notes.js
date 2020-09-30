import React, {useState} from 'react';
import './AllNotes.css';
import deleteImg from '../img/delete.png';
import editImg from '../img/edit.png'
import Popup from '../popup/Popup';

function AllNotes(props) {
  
  const {notes, onNoteClick, onDeleteClick, set} = props;
  const [openPopup, setOpenPopup] = useState(false);
  const [noteChoice, setNoteChoice] = useState('');


  function handleClick(note){
      onNoteClick(note);
  }

  function handleDeleteClick(note){
      onDeleteClick(note);
  }

  function handleEditClick(note){
      setNoteChoice(note);
      setOpenPopup(!openPopup);
  }

  function handleSaveClick(noteNew, index){
      set(
        [
          ...notes.slice(0, index),
         {
          ...notes[index],
          title: noteNew.title,
          author: noteNew.author,
          date: noteNew.date,
          category: noteNew.category,
          description: noteNew.description
         },
          ...notes.slice(index + 1)
        ]
      );
  }

  return (
    <>
        {notes.map( note => (
            <div className="myNote" key={note.id}>
                <div className="item" onClick={() => handleClick(note)}>
                    {note.title}
                </div>
                <div className="img">
                    <img onClick={() => handleDeleteClick(note)} src={deleteImg} alt={''} width={20} height={20}/>
                    <img onClick={() => handleEditClick(note)} src={editImg} alt={''} width={30} height={30}/>
                </div>
            </div>
        ))}
        <Popup 
            openPopup={openPopup} 
            setOpenPopup={setOpenPopup} 
            notes={notes} 
            note={noteChoice} 
            isEditOrAdd = {true}
            onSaveClick={handleSaveClick}
        />
    </>
  );
}

export default AllNotes;