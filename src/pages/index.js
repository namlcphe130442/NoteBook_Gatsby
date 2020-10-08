import React, {useState} from 'react'
import JSONData from '../../content/My-JSON-Content.json'
import Fuse from 'fuse.js';
import AllNotes from '../components/AllNotes/all-notes'
import SearchNote from '../components/SearchNote/SearchNote'
import NoteDetail from '../components/NoteDetail/NoteDetail'
import Popup from '../components/popup/Popup'
import './App.css';

function JsonBuildTime(){

  const [notes, setNotes] = useState(JSONData);
  const [query, setQuery] = useState('');
  const [noteDetail, setNoteDetail] = useState('');
  const [openPopup, setOpenPopup] = useState(false);

  const fuse = new Fuse(notes, {
    keys: [
      'title'
    ],
    includeMatches: true
  })

  const results = fuse.search(query);
  const characterResults = query ==='' ? notes : results.map(result => result.item);

  function handleSearchClick(txtSearch){
    setQuery(txtSearch);
  }

  function handleDeleteClick(note){
    const index = notes.findIndex(x => x.id === note.id);
    if(index < 0) return;
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    if(note.id === noteDetail.id){
      setNoteDetail('');
    }
  }
  function handleEditClick(note){
    console.log(note);
  }

  function handleSaveNoteClick(newNotes, noteNew){
    setNotes(newNotes);
    if(noteNew.id === noteDetail.id){
      setNoteDetail(noteNew);
    }
  }

  function handleNoteClick(note){
    setNoteDetail(note);
  }

  function handleAddClick(){
    setOpenPopup(true);
  }

  function handleSaveClick(newNote){
    const newNotes = [...notes];
    newNotes.push(newNote);
    setNotes(newNotes);
  }

  return(
    <div className="App">
      <div className="body">
        <div className="left">
          <SearchNote
            searchOnClick={handleSearchClick}
          />
          <button className="button-add" onClick={handleAddClick}>Add Note</button>
          <AllNotes
            notes={characterResults} 
            onNoteClick={handleNoteClick}
            onDeleteClick={handleDeleteClick} 
            onEditClick={handleEditClick}
            onSaveCLick={handleSaveNoteClick}
          />
        </div>
        <div className="right">
          <NoteDetail 
            note ={noteDetail}
          />
        </div>
      </div>
        <Popup 
          openPopup={openPopup} 
          setOpenPopup={setOpenPopup} 
          notes={notes} 
          note={''} 
          isEditOrAdd={false}
          onSaveClick={handleSaveClick}
        />
    </div>
  );
}
export default JsonBuildTime