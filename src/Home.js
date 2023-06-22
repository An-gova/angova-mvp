import './index.css';
import './home.css';
import React ,{useState, useEffect} from 'react';
import {  useNavigate    } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BottomBar  from './components/BottomBar';
import NavbarComponent  from './components/Navbar';

const theme = createTheme();


function Home() {
  const theme = createTheme({
    typography: {
      fontFamily: ['IgraSans', 'Raleway', 'Arial'].join(','),
    },
   
  })
  const [show, setShow] = useState(false);
  const [value, setValue] = React.useState('code');
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue == "profil"){
      navigate("/profil");
    }
  };


  localStorage.setItem('langue', 'fr');
  

  useEffect(()=>{
    setShow(true)
  }, [])
  const handleClose = () => {
    setShow(false);
  };
  const showUkArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'uk');
    //localStorage.getItem('langue');
  }
  const showSpainArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'spain');
    //localStorage.getItem('langue');
  }
  const showTurcArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'turc');
    //localStorage.getItem('langue');
  }
  const showFrArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'fr');
    //localStorage.getItem('langue');
  }
  const showMarocArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'maroc');
    //localStorage.getItem('langue');
  }
  const showAlgArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'alg');
    //localStorage.getItem('langue');
  }
  const showTuniArticle = async ()=> {
    // setter
    localStorage.setItem('langue', 'tuni');
    //localStorage.getItem('langue');
  }

  return (
   
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <NavbarComponent setShow= {setShow} page={value}/>
        <Grid id="sessionContainer" container direction="row" style={{height:"94vh"}}>
          <Grid item lg={3} sx={{flexDirection:'column' ,alignItems:'end' ,display: { xs: 'none', lg: 'flex' }}}>
            <button className='btn-section' ><img src='./home.png'alt='' style={{width:40, marginRight:15}}/><span className='btn-section-title' >Session de code</span></button>
          </Grid>
          
          <Grid item xs={12} lg={8} >
            <Grid container direction="row" >
              <Grid item xs={12} sm={6} lg={4}style={{display:'flex', flexDirection:"column", alignItems:'center', marginTop:35}}  >
                <Card
                  sx={{
                    maxWidth: 345,
                    "&:hover": {
                      ".MuiCardMedia-root": {
                        filter: "brightness(70%)",
                        transform: "scale3d(1.2, 1.2, 1)",
                      }
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    image='./images/session1.png'
                    className='imgSessionHome'
                    alt="session"
                    // Add this if you want the hover on the image only and remove the above hover
                    sx={{
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "scale3d(0.2, 0.2, 0.2)",
                        cursor: "pointer",
                      }
                    }}
                    onClick={()=>{
                      navigate("/session");
                    }} 
                  />
                  {/* <div>
                    <img src="./images/play.png" />
                  </div> */}
                  <CardContent>
                    <Typography sx={{fontWeight:600, display: "flex", justifyContent:"center"}}  variant="h7" >
                      Session 1   
                    </Typography>
                   
                  </CardContent>
                </Card>                
              </Grid>
              
            </Grid>
            
          </Grid>
           
        </Grid> 
        
       
        
        <Dialog fullWidth
          maxWidth="sm" open={show} onClose={handleClose}> 
          <div style={{ display:"flex",
          flexDirection: "column",
          alignItems: 'center'}} >
  
          <DialogTitle  id="titlePopupContainer" > 
              <Typography variant="h5" id="titlePopupFlag" style={{fontWeight:700}}>Choisir la langue du code de la route</Typography>
              <IconButton aria-label="close" style={{position: 'absolute', right: theme.spacing(1), top: theme.spacing(1),color: theme.palette.grey[500]}} 
              onClick={handleClose}>
                  <CloseIcon />
              </IconButton>
          </DialogTitle>
          <DialogContent>
              <Grid container direction="row" style={{alignItems:'center', marginBottom:40}}>
                <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                  <img className="flag" style={{width:"50%"}} onClick={() => {showFrArticle()}} src="./images/france.png" />
                </Grid>
                <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                  <img className="flag" style={{width:"50%"}} onClick={() => {showUkArticle()}}  src="./images/uk.png" />
                </Grid>
                <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                  <img className="flag" style={{width:"50%"}} onClick={() => {showAlgArticle()}} src="./images/algerie.png" />
                </Grid>
                <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                  <img className="flag" style={{width:"50%"}} onClick={() => {showMarocArticle()}} src="./images/maroc.png" />
                </Grid>
                <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                  <img className="flag" style={{width:"50%"}} onClick={() => {showTuniArticle()}} src="./images/tuni.png" />
                </Grid>
                <Grid className="flagGrid" item xs ={4} style={{display:"flex", flexDirection:'column',alignItems:'center', marginTop:30}}>
                  <img className="flag" style={{width:"50%"}} onClick={() => {showTurcArticle()}} src="./images/turq.png" />
                </Grid>
                
              </Grid> 
          </DialogContent>
          </div>
        </Dialog>
        <BottomBar handleChange= {handleChange}
         value={value}/>
      </ThemeProvider>
      
    </>
  );
}
export default Home;