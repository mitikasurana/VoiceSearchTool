import React, { useState,useEffect} from 'react';
import axios from 'axios';
import styles from '../CSS/SpeechToText.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MicIcon from '@material-ui/icons/Mic';
import ReplayIcon from '@material-ui/icons/Replay';
import { Container, Box, TextField, Tooltip, Button, Typography } from '@material-ui/core';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import ProductsSwiper from './ProductsSwiper';
import ProductContainer from './ProductContainer';
import weather from '../weather/app.js';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "white",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width : 300
  },
}));

const SpeechToText = React.memo(() => {

  const classes = useStyles();
  const [micOn , setMic] = useState(false);
  const [items, setItems] = useState(null);
  const [userQuery,setQuery] = useState('');
  const [filterOn, setFilter] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [filterItems, setFilterItems] = useState(null);
  const [filterFetched ,setFilterFetched] = useState(false);
  const { transcript, resetTranscript} = useSpeechRecognition();
  const [voiceText , setText ] = useState("Hey there,  I am your MyntraMate...how can I help you ?");

  useEffect(() => {
    console.log("Started");
  }, [filterItems,items]);


  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  function doOnFilter() {

    setFilter(true);

    setText("Please tell the location");
    setTimeout(()=>{
      console.log(userQuery);
      resetTranscript();
      setText("Please tell the time");
      setTimeout(()=>{
              console.log("THIS IS INNER TIMEOUT");
              resetTranscript();
              var n = userQuery.length;
              const result = weather(userQuery[n-2],userQuery[n-1]);
              console.log(result);
              setQuery(result.season);
              SpeechRecognition.stopListening();
              handleFilterSearch(userQuery);
      },4000)
    },4000);
    
  }


  function handleFilterRemove(){
    setFilter(false);
    setFilterFetched(false);
  }

  function handleMicState(){
    if(!micOn){
      console.log("Listening");
      setText("Listening...Speak now");
      SpeechRecognition.startListening({continuous:true});
    }
    else {
      resetTranscript();
      SpeechRecognition.stopListening();
      console.log("Stopped Listening");
      if(!filterOn){
        setQuery(transcript);
        handleSearch();
      }
      else{
        console.log("THIS IS ELSE");
        console.log(transcript);
        var temp = userQuery;
        var str = temp.concat(transcript);
        console.log(str);
      }
    }
    setMic(!micOn);
  }

  function handleFilterSearch(userQuery){
    setText("Good things take time...Please wait");
    userQuery  = transcript + " " + userQuery;
    if(userQuery !== null && userQuery !== ""){
      const url = "http://127.0.0.1:8080/api/results";
      const data = {command : userQuery}
      axios.get(url, {
        params:data
      }).then(response => {
        setFilterItems(response.data.results);
        setFilterFetched(true);
      }).catch(error => {
        console.log(error)
      })
    }
  }

  function handleSearch() {
    console.log(transcript);
    setText("Good things take time...Please wait");
    // userQuery.push(transcript);
    if(transcript !== null && transcript !== ""){
      const url = "http://127.0.0.1:8080/api/results";
      const data = {command : transcript}
      axios.get(url, {
        params:data
      }).then(response => {
        console.log(response);
        setItems(response.data.results);
        setFetched(true);
        setText("Here I have got..this for you!!");
        console.log(items);
      }).catch(error => {
        console.log(error)
      })
    }
  }

  return (
    <React.Fragment>
      <Container className={styles.container}>
        <Box className={styles.box}>
          <TextField  
            value={transcript}
            className={styles.child1}/>
            
          {!micOn && (
            <Tooltip title="Speak" className={styles.child2}>
              <MicIcon 
                fontSize="large"
                color = "primary"
                onClick={handleMicState}
            />
            </Tooltip>
            
          )}
          {
            micOn && (
              <Tooltip title="Stop" className={styles.child2}>
                <MicIcon 
                  fontSize="large"
                  color ="secondary"
                  onClick={handleMicState}
                />
              </Tooltip> 
            )
          }
          <Tooltip title="Reset" className={styles.child2}>
            <ReplayIcon
              fontSize="large"
              color="primary"
              onClick={resetTranscript}
            />
          </Tooltip>
          
          <Tooltip title="Location-Weather-Filter" className={styles.child2}>
            <FilterDramaIcon
              fontSize="large"
              color="primary"
              onClick={doOnFilter}
            />
          </Tooltip>
        </Box>
        <Fade in={true}>
          <Typography className={styles.button} variant="h4" component="h2">{voiceText}</Typography>
        </Fade>
      </Container>
      { filterFetched && filterOn &&(
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={filterOn}
            onClose={handleFilterRemove}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <div className={classes.paper}>
                  <ProductsSwiper  items = {filterItems} season={"winter"} />
            </div>
        </Modal>
  
      )}
      {
        fetched && (
          <ProductContainer  items = {items}/>
        )
      }
    </React.Fragment>
  );
})

export default SpeechToText;