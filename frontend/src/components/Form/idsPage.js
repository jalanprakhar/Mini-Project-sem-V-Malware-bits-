import {React,useState,useEffect} from 'react';
import Split from 'react-split'
import Form from './form'
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useCookies } from 'react-cookie';
import { Link,Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Flow from "./Flow.js";


export default function IdsPage() {
  const [cookies, setCookie,removeCookie] = useCookies({});
  const [isLoading , setIsLoading] = useState(" ");
  const [test, setTest] = useState(0);
  const [training, setTraining] = useState(0);
  const [img1, setImg1] = useState("")
  const [img2, setImg2] = useState("")
  const [img3, setImg3] = useState("")
  const [img4, setImg4] = useState("")
  const navigate = useNavigate()


  function handleLoading(temp1) {
    setIsLoading(temp1);
  }
  function handleTest(temp2) {
    setTest(temp2);
  }
  function handleTraining(temp3) {
    setTraining(temp3);
  }
  function handleImg1(temp4) {
    setImg1(temp4);
  }
  function handleImg2(temp5) {
    setImg2(temp5);
  }
  function handleImg3(temp6) {
    setImg3(temp6);
  }
  function handleImg4(temp7) {
    setImg4(temp7);
  }

  const handleLogout = () => {
    removeCookie("jwtoken", { path: "/" });
    removeCookie("userid", { path: "/" });
    removeCookie("username", { path: "/" });
    removeCookie("token", { path: "/" });
  };

  const handleModel = () => {
    
  };


  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  const itemData=[
    {
      img:img1,
      title:"Testing Confusion Matrix"
    },
    {
      img:img2,
      title:"Testing Classification Report"
    },
    {
      img:img3,
      title:"Training Confusion Matrix"
    },
    {
      img:img4,
      title:"Training Classification Report"
    },
  ];
  // useEffect(() => {
  //   if(!cookies.jwtoken){
  //     navigate("/");
  //   }
  // }, []);
return (
<div className="App">
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx ={{ width : "100vw"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Intrusion Detection Testbed
          </Typography>
          <Button color="inherit" component={Link}
                to={"/bestModel"} onClick={handleModel}>Best Model</Button>
          <Button color="inherit" component={Link}
                to={"/"} onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
<Split
        className='flex'
        sizes= {isLoading === " " ? [70, 30] : [60, 40]}
        style={{height:"100%",width:"100%",display:"flex",margin:"auto"}}
        minSize={500}
      >
        <div style={{height:"100%",width:"100%",overflow:"auto"}}>
          
          <Form handleLoading={handleLoading} handleTest={handleTest} handleTraining={handleTraining} handleImg1={handleImg1} handleImg2={handleImg2} handleImg3={handleImg3} handleImg4={handleImg4}/>
        </div>
        <Split
          direction='vertical'
          sizes={[70, 30]}
          style={{width:"100%",height:"100%",margin:"auto"}}
        >
          <div className="topright">
            { 
            isLoading === " " ? 
            null : 
            isLoading === true ? <Flow/> : 
          <ImageList>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                // subtitle={<span>by: {item.author}</span>}
                position="below"
              />
            </ImageListItem>
          ))}
    </ImageList>
}
          </div>

          <div className="bottomright">
          { 
            isLoading === " " ? 
            null : 
            isLoading === true ? <CircularProgress disableShrink /> : 
            <div>
                <Box component="span" sx={{ display: 'block' }}>
                <Box
                    component="div"
                    sx={{
                      display: 'inline',
                      p: 1,
                      m: 1,
                      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                      border: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                      borderRadius: 2,
                      fontSize: '1rem',
                      fontWeight: '900',
                    }}
                >Training Accuracy   : </Box>
                <Box component="div" sx={{ display: 'inline',verticalAlign: '-50%' }}><CircularProgressWithLabel value={training} /></Box>
                </Box>

                <Box component="span" sx={{ display: 'block' }}>
                <Box
                    component="div"
                    sx={{
                      display: 'inline',
                      p: 1,
                      m: 1,
                      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                      border: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                      borderRadius: 2,
                      fontSize: '1rem',
                      fontWeight: '900',
                    }}
                >Testing Accuracy   : </Box>
                <Box component="div" sx={{ display: 'inline',verticalAlign: '-50%' }}><CircularProgressWithLabel value={test} /></Box>
                </Box>
          </div>
}
          </div>
        </Split>
</Split>
</div>
)
}