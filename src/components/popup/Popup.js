import React, {useState, useEffect} from 'react';
import { Grid, Dialog, Button, DialogTitle, TextField, DialogContent, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function Popup(props) {

    const {openPopup, setOpenPopup, notes, note, onSaveClick, isEditOrAdd} = props;
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        setTitle(note.title);
        setAuthor(note.author);
        setDate(note.date);
        setDescription(note.description);
        setCategory(note.category);
      },[note]);

    const useStyles = makeStyles(theme => ({
        dialogWrapper: {
            padding: theme.spacing(2),
            position: 'absolute',
            top: theme.spacing(5)
        },
        dialogTitle: {
            paddingRight: '0px'
        }
    }))

    const classes = useStyles();

    function handleTitleChange(event){
        setTitle(event.target.value);
    }
    
    function handleAuthorChange(event){
        setAuthor(event.target.value);
    }
    
    function handleDateChange(event){
        setDate(event.target.value);
    }
    
    function handleCategoryChange(event){
        setCategory(event.target.value);
    }

    function handleDescriptionChange(event){
        setDescription(event.target.value);
    }

    function handleSubmitClick(){
        if(isEditOrAdd){
            const id = note.id;
            const noteNew ={
            id: id, title: title, author: author, date: date, category: category, description: description
            };
            const index = notes.indexOf(note);
            onSaveClick(noteNew, index);
        }else{
            const noteNew ={
                id: notes.length + 1, title: title, author: author, date: date, category: category, description: description
            };
            onSaveClick(noteNew)
        }
        setOpenPopup(false)
    }

    return(
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {"Edit Form"}
                    </Typography>
                    <button
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
            <form>
                <Grid container>
                    <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        label={"Title"}
                        name={"title"}
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        variant="outlined"
                        label={"Author"}
                        name={"author"}
                        value={author}
                        onChange={handleAuthorChange}
                    />
                    <br/><br/>
                    Date : <input type="date" variant="inline" value={date} onChange={handleDateChange}/>
                    </Grid>
                    <Grid item xs={6}>
                    <div>
                        <select value={category} onChange={handleCategoryChange}>
                            {notes.map( note => (
                            <option key={note.category} value={note.category}>{note.category}</option>
                            ))}
                        </select>
                    </div>
                    <br/><br/>
                    <TextField
                        variant="outlined"
                        label={"Description"}
                        name={"description"}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <div>
                        <Button
                            variant={"contained"}
                            size={"large"}
                            color={"primary"}
                            classes={{ root: classes.root, label: classes.label }}
                            onClick={handleSubmitClick}
                        >
                            {"Save"}
                        </Button>
                    </div>
                    </Grid>
                </Grid>
            </form>
            </DialogContent>
        </Dialog>
    );
}

export default Popup;