import React, {useEffect, useRef, useState} from 'react'
import {showToast} from "../App";

import '../config/firebase_config'
import firebase from "firebase/app"
import 'firebase/firestore'
import {Grid,Paper} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Countdown from "react-countdown";
import LinkIcon from '@material-ui/icons/Link';
import Link from "@material-ui/core/Link";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const DashboardHome=props=>{

    const classes = useStyles();

    const [dialog,setDialog]=useState(false)
    const [uploading,setUploading]=useState(false)
    const [loading,setLoading]=useState(true)

    const [contests,setContests]=useState([])

    const fetchContests=()=>{
        showToast("Hello World from BUET CSE'18")
        firebase.firestore().collection('contests').get().then(res=>{
            var docs=[]
            res.docs.map(doc=>{
                var data=doc.data()
                data['id']=doc.id
                if(data.d1>Date.now())
                    docs.push(data)
            })
            setContests(docs)
            setLoading(false)
            console.log(docs)
        }).catch(err=>{
            showToast('Error occurred while fetching data...')
            setLoading(false)
        })
    }

    useEffect(()=>{
        fetchContests()
    },[])

    const nameRef=useRef()
    const introRef=useRef()
    const titleRef=useRef()
    const photoRef=useRef()
    const linkRef=useRef()
    const locationRef=useRef()
    const desRef=useRef()
    const teamRef=useRef()
    const resRef=useRef()
    const dt1Ref=useRef()
    const d1Ref=useRef()
    const dt2Ref=useRef()
    const d2Ref=useRef()
    const dt3Ref=useRef()
    const d3Ref=useRef()

    const addEventClick=()=>{
        if(nameRef.current.value.trim().length===0)
            showToast('Please enter your name')
        else if(introRef.current.value.trim().length===0)
            showToast('Please enter your identity (eg: university, dept, roll)')
        else if(titleRef.current.value.trim().length===0)
            showToast('Please enter title of the event')
        else if(linkRef.current.value.trim().length===0)
            showToast('Please enter link to the event')
        else if(locationRef.current.value.trim().length===0)
            showToast('Please enter location of the event')
        else if(teamRef.current.value.trim().length===0)
            showToast('Please enter team size')
        else if(dt1Ref.current.value.trim().length===0)
            showToast('Please enter at least one deadline')
        else{
            var data={
                name:nameRef.current.value.trim(),
                intro:introRef.current.value.trim(),
                title:titleRef.current.value.trim(),
                link:linkRef.current.value.trim(),
                location:locationRef.current.value.trim(),
                teamRef:teamRef.current.value.trim(),
                dt1:dt1Ref.current.value.trim(),
                d1:new Date(d1Ref.current.value).getTime()
            }
            if(photoRef.current.value.trim().length>0)data['photo']=photoRef.current.value.trim()
            if(desRef.current.value.trim().length>0)data['des']=desRef.current.value.trim()
            if(resRef.current.value.trim().length>0)data['res']=resRef.current.value.trim()
            if(dt2Ref.current.value.trim().length>0)data['d2']=new Date(d2Ref.current.value).getTime()
            if(dt3Ref.current.value.trim().length>0)data['d2']=new Date(d3Ref.current.value).getTime()
            setUploading(true)
            firebase.firestore().collection('contests').add(data).then(()=>{
                showToast('Contest submitted for review...')
                setUploading(false)
                setDialog(false)
                fetchContests()
            }).catch(err=>{
                showToast('Error occurred')
                setUploading(false)
            })
        }

    }

    return (
        <div>
            <Dialog open={dialog}>
                {
                    uploading?(
                        <LinearProgress/>
                    ):(
                        <div/>
                    )
                }
                <DialogTitle>+Add Contest</DialogTitle>
                <DialogContent className={classes.root}>
                    <TextField
                        inputRef={nameRef}
                        style={{marginTop:'10px'}}
                        autoFocus
                        margin="dense"
                        label="* Name"
                        style={{width:'50%'}}
                        variant="outlined"
                    />
                    <TextField
                        inputRef={introRef}
                        style={{marginTop:'10px'}}
                        autoFocus
                        margin="dense"
                        label="* Intro(Versity/Dept/Roll)"
                        style={{width:'49%',marginLeft:'1%'}}
                        variant="outlined"
                    />
                    <TextField
                        inputRef={titleRef}
                        style={{marginTop:'10px'}}
                        autoFocus
                        margin="dense"
                        label="* Title"
                        style={{width:'50%'}}
                        variant="outlined"
                    />
                    <TextField
                        inputRef={photoRef}
                        style={{marginTop:'10px'}}
                        autoFocus
                        margin="dense"
                        label="Cover Photo"
                        style={{width:'49%',marginLeft:'1%'}}
                        variant="outlined"
                    />
                    <TextField
                        inputRef={linkRef}
                        style={{marginTop:'10px'}}
                        autoFocus
                        margin="dense"
                        label="* Link"
                        style={{width:'50%'}}
                        variant="outlined"
                    />
                    <TextField
                        inputRef={locationRef}
                        style={{marginTop:'10px'}}
                        autoFocus
                        margin="dense"
                        label="* Location"
                        style={{width:'49%',marginLeft:'1%'}}
                        variant="outlined"
                    />
                    <TextField
                        inputRef={desRef}
                        style={{marginTop:'10px'}}
                        autoFocus
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                    />
                    <TextField
                        inputRef={teamRef}
                        style={{marginTop:'10px'}}
                        autoFocus
                        margin="dense"
                        label="* Team Size"
                        style={{width:'33%'}}


                        variant="outlined"
                    />
                    <TextField
                        inputRef={resRef}
                        style={{marginTop:'10px'}}
                        autoFocus
                        margin="dense"
                        label="Restriction"
                        style={{width:'66%',marginLeft:'1%'}}
                        variant="outlined"
                    />
                    <TextField
                        inputRef={dt1Ref}
                        style={{marginTop:'10px'}}
                        autoFocus
                        margin="dense"
                        label="* Deadline1 Title"
                        style={{width:'50%'}}
                        variant="outlined"
                    />
                    <TextField
                        inputRef={d1Ref}
                        id="datetime-local"
                        label="Deadline"
                        type="datetime-local"
                        defaultValue="2020-10-01T22:30"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{width:'49%',marginLeft:'1%'}}
                    />
                    <TextField
                        inputRef={dt2Ref}
                        style={{marginTop:'10px'}}
                        autoFocus
                        margin="dense"
                        label="Deadline2 Title"
                        style={{width:'50%'}}
                        variant="outlined"
                    />
                    <TextField
                        inputRef={d2Ref}
                        id="datetime-local"
                        label="Deadline"
                        type="datetime-local"
                        defaultValue="2020-10-01T22:30"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{width:'49%',marginLeft:'1%'}}
                    />
                    <TextField
                        inputRef={dt3Ref}
                        style={{marginTop:'10px'}}
                        autoFocus
                        margin="dense"
                        label="Deadline3 Title"
                        style={{width:'50%'}}
                        variant="outlined"
                    />
                    <TextField
                        inputRef={d3Ref}
                        id="datetime-local"
                        label="Deadline"
                        type="datetime-local"
                        defaultValue="2020-10-01T22:30"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        style={{width:'49%',marginLeft:'1%'}}
                    />



                </DialogContent>
                <DialogActions>
                    <Button disabled={uploading} onClick={()=>{setDialog(false)}} color="secondary">
                        Cancel
                    </Button>
                    <Button  disabled={uploading} onClick={addEventClick}  color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
            <AppBar style={{marginBottom:'10px'}} position="static">
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        Eventeer CSE'18
                    </Typography>
                    <Button onClick={()=>{setDialog(true)}} color="inherit">+Add</Button>
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid item xs={0} md={4}>

                </Grid>
                <Grid item xs={12} md={4}>

                        {
                            loading?(
                                <LinearProgress/>
                            ):(
                                <div/>
                            )
                        }
                        {
                            contests.map(contest=>{
                                return(
                                    <Card style={{marginTop:'20px'}}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="250"
                                                image={'photo' in contest?contest.photo:'contest.png'}
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {contest.title}
                                                </Typography>
                                                <div style={{display:'flex',marginTop:'20px'}}>
                                                    <LinkIcon color={'primary'}/>
                                                    <Link href={contest.link}>
                                                        <div style={{fontSize:'1.2em',marginTop:'3px',marginLeft:'5px'}}>
                                                            Link to this contest
                                                        </div>
                                                    </Link>

                                                </div>
                                                <div style={{display:'flex',marginTop:'20px'}}>
                                                    <LocationOnIcon color={'primary'}/>
                                                    <div style={{color:'#00aa00',fontSize:'1.2em',marginTop:'3px',marginLeft:'5px'}}>
                                                        {contest.location}
                                                    </div>
                                                    <PeopleIcon color={'primary'} style={{marginLeft:'40px'}}/>
                                                    <div style={{color:'#0090ff',fontSize:'1.2em',marginTop:'3px',marginLeft:'5px'}}>
                                                        {contest.teamRef}
                                                    </div>
                                                </div>
                                                {
                                                    'des' in contest?(
                                                        <Typography style={{marginTop:'20px'}} variant="body2" color="textSecondary" component="p">
                                                            {contest.des}
                                                        </Typography>
                                                    ):(
                                                        <div/>
                                                    )
                                                }

                                                <div style={{marginTop:'20px',color:'#aa0000',fontSize:'1.2em',display:'flex'}}>
                                                    <AccessAlarmIcon style={{marginRight:'10px'}}/>
                                                    <div style={{marginTop:'4px'}}>
                                                        {contest.dt1} : <Countdown style={{marginLeft:'10px'}} date={contest.d1} />

                                                    </div>
                                                </div>



                                            </CardContent>

                                        </CardActionArea>

                                        <CardActions>
                                            <div style={{marginLeft : '10px',marginTop:'-6px',color:'#888888',fontSize:'1.0em'}}>
                                                Added by - {contest.name}, {contest.intro}
                                            </div>
                                        </CardActions>

                                    </Card>
                                )
                            })
                        }

                </Grid>
                <Grid item xs={0} md={4}>

                </Grid>
            </Grid>
        </div>
    );
}

export default DashboardHome;

