import { useRef, useState } from 'react';

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

import storage from "../../store/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function NewMeetupForm(props){
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();

    const [downloadedUrl, setDownloadedUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [percent, setPercent] = useState(0);

    function submitHandler(event){
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredImage = downloadedUrl;
        const enteredAddress = addressInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const meetupData = {
            title: enteredTitle,
            image: enteredImage,
            address: enteredAddress,
            description: enteredDescription,
        }

        if(enteredImage) props.onAddMeetup(meetupData); else alert("Click to upload please!");
    }

    function fileSelectedHandler(event){
        setSelectedFile(event.target.files[0]);
        console.log("imageInputRef", imageInputRef);
    }

    function fileUploadHandler(){
        if (!selectedFile) {
          alert("Please upload an image first!");
        }
            
        const storageRef = ref(storage, `/files/${selectedFile.name}`);
            
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
            
        uploadTask.on(
            "state_changed",
            (snapshot) => {
            const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            
            // update progress
            setPercent(percent);
            },
            (err) => console.log(err),
            () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadedUrl(url);
            });
            }
        );

    }

    function fileClickHandler(){
        imageInputRef.current.click();
    }

    function progressBar(procent){
        return {         
            background: "linear-gradient(90deg, rgba(69,252,87,1) "+percent+"%, rgba(253,29,29,1) 100%)",
            transition: "background .5s ease-out",
        }
    }

    return (
        <>
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="title">Meetup Title</label>
                    <input type="text" required id="title" ref={titleInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor="file">Image</label>                    
                    <div className={classes.imageCont}>{percent === 100 ? <img src={downloadedUrl} alt="preview"/> : ""}</div>
                    { (percent !==0) && (percent !==100) ? <p className={classes.progressBar} style={ progressBar(percent) }>&nbsp;</p> : ""}                    
                    <div className={classes.actions}>                        
                        <button  type="button" onClick={fileClickHandler}>Select
                            <input type="file" className={classes.hidden} required id="file" onChange={fileSelectedHandler} ref={imageInputRef}/>                    
                        </button>
                        <button  type="button" onClick={fileUploadHandler}>Upload</button>
                    </div>
                </div>                 
                <div className={classes.control}>
                    <label htmlFor="address">Address</label>
                    <input type="text" required id="address" ref={addressInputRef}/>
                </div>                               
                <div className={classes.control}>
                    <label htmlFor="description">Description</label>
                    <textarea required id="description" rows="5" ref={descriptionInputRef}/>
                </div>  
                <div className={classes.actions}>
                    <button>Add Meetup</button>
                </div> 
            </form>

        </Card>
        
        </>
    );

}

export default NewMeetupForm;