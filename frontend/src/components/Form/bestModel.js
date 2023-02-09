import {React,useState,useEffect} from 'react';
import Split from 'react-split'
import BestForm from './bestForm'
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { GraphicEqSharp } from '@material-ui/icons';

var graphData=[];
// const data = [
//   {
//     searchQuery: "Page A",
//     trainingAcc: 4000,
//     testAcc: 2400,
//     amt: 2400
//   },
//   {
//     searchQuery: "Page B",
//     trainingAcc: 3000,
//     testAcc: 1398,
//     amt: 2210
//   },
//   {
//     searchQuery: "Page C",
//     trainingAcc: 2000,
//     testAcc: 9800,
//     amt: 2290
//   },
//   {
//     searchQuery: "nonojn",
//     trainingAcc: 2780,
//     testAcc: 3908,
//     amt: 2000
//   },
//   {
//     searchQuery: "Pag",
//     trainingAcc: 1890,
//     testAcc: 4800,
//     amt: 2181
//   },
//   {
//     searchQuery: "Page F",
//     trainingAcc: 2390,
//     testAcc: 3800,
//     amt: 2500
//   },
//   {
//     searchQuery: "Page G",
//     trainingAcc: 3490,
//     testAcc: 4300,
//     amt: 2100
//   }
// ];

export default function BestModel() {
  const [cookies, setCookie,removeCookie] = useCookies({});
  const [isLoading , setIsLoading] = useState(" ");
  const [test, setTest] = useState(0);
  const [training, setTraining] = useState(0);
  const [img1, setImg1] = useState("")
  const [img2, setImg2] = useState("")
  const [img3, setImg3] = useState("")
  const [img4, setImg4] = useState("")
  const [arrstr , setArrstr] = useState("");
  const navigate = useNavigate()


  const handleLogout = () => {
    removeCookie("jwtoken", { path: "/" });
    removeCookie("userid", { path: "/" });
    removeCookie("usersearchQuery", { path: "/" });
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
  const fetchData = async() => {
  setIsLoading(true)
  const res=await fetch(`/${cookies.userid}/getuser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : cookies.jwtoken
    },
  });
  const data = await res.json();
  const data2 = data.searchHistory[0];
  graphData=data.searchHistory;
  graphData.forEach(function(elem, index) {
    // if(elem.searchQuery.startsWith("mul lgr") || elem.searchQuery.startsWith("bnr lgr")) this[index].searchQuery="Logistic Regression";
    // if(elem.searchQuery.startsWith("mul nvb") || elem.searchQuery.startsWith("bnr nvb")) this[index].searchQuery="Naive Bayes";
    // if(elem.searchQuery.startsWith("mul dst") || elem.searchQuery.startsWith("bnr dst")) this[index].searchQuery="Decision Tree";
    // if(elem.searchQuery.startsWith("mul rfc") || elem.searchQuery.startsWith("bnr rfc")) this[index].searchQuery="Random Forest";
    // if(elem.searchQuery.startsWith("mul adb") || elem.searchQuery.startsWith("bnr adb")) this[index].searchQuery="AdaBoost ";
    // if(elem.searchQuery.startsWith("mul ann") || elem.searchQuery.startsWith("bnr ann")) this[index].searchQuery="Artificial Neural Network";
    if(elem.searchQuery.startsWith("mul lgr") || elem.searchQuery.startsWith("bnr lgr")) this[index].searchQuery="lgr";
    if(elem.searchQuery.startsWith("mul nvb") || elem.searchQuery.startsWith("bnr nvb")) this[index].searchQuery="nbs";
    if(elem.searchQuery.startsWith("mul dst") || elem.searchQuery.startsWith("bnr dst")) this[index].searchQuery="dst";
    if(elem.searchQuery.startsWith("mul rfc") || elem.searchQuery.startsWith("bnr rfc")) this[index].searchQuery="rfc";
    if(elem.searchQuery.startsWith("mul adb") || elem.searchQuery.startsWith("bnr adb")) this[index].searchQuery="adb";
    if(elem.searchQuery.startsWith("mul ann") || elem.searchQuery.startsWith("bnr ann")) this[index].searchQuery="ann";
  }, graphData);
  console.log(graphData);
  setImg1(data2.fileTestClfRep)
  setImg2(data2.fileTestConfMat)
  setImg3(data2.fileTrainClfRep)
  setImg4(data2.fileTrainConfMat)
  const str = data2.searchQuery;
  const ans = str.split(" ")
  setArrstr(ans);
    setTest(parseFloat(data2.testAcc))
    setTraining(parseFloat(data2.trainingAcc))
    setIsLoading(false);
}
 
  useEffect(() => {
    if(1===2){
      navigate("/");
    }
    else{
        fetchData();
    }
  }, []);
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
            Best Model
          </Typography>
          <Button color="inherit" component={Link}
                to={"/ids"} onClick={handleModel}>IDS Testbed</Button>
          <Button color="inherit" component={Link}
                to={"/"} onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
<Split
        className='flex'
        sizes= {[60, 40]}
        style={{height:"100%",width:"100%",display:"flex",margin:"auto"}}
        minSize={500}
      >
        <div style={{height:"100%",width:"100%",overflow:"auto"}}>
          { isLoading ? <CircularProgress disableShrink /> :
          <div>
          <BestForm isLoading={isLoading} arrstr={arrstr} />
          {/* <br/><br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> 
              <br/><br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> */}
              <LineChart width={800} height={500} data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="searchQuery" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="testAcc"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="trainingAcc" stroke="#82ca9d" />
              </LineChart>
          </div>
          }
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
            isLoading === true ? <CircularProgress disableShrink /> :
            <div>
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
            </div>
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