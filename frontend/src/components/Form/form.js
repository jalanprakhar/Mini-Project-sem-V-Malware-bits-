import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './form.css'
import { useCookies } from 'react-cookie';
import { FormControlLabel } from "@material-ui/core";
 
 
 
const theme = createTheme();
 
export default function Form(props) {
  const {handleLoading,handleTest,handleTraining,handleImg1,handleImg2,handleImg3,handleImg4} = props;
  const [cookies, setCookie] = useCookies({});
 
  const [one , setOne] = React.useState("");
  const [two , setTwo] = React.useState("");
  const [three , setThree] = React.useState("");
  const [four , setFour] = React.useState("");
  const [five , setFive] = React.useState("");
  const [six , setSix] = React.useState("");
  const [seven , setSeven] = React.useState("");
  const [solver , setSolver] = React.useState("none");
 
  const handleChange1 = (event) => {
    setOne(event.target.value)
  };
 
  const handleChange2 = (event) => {
    setTwo(event.target.value)
  };
 
  const handleChange3 = (event) => {
    setThree(event.target.value);
    setSolver(event.target.value);
  };
 
  const handleChange4 = (event) => {
    setFour(event.target.value);
  };
 
  const handleChange5 = (event) => {
    setFive(event.target.value);
  };
 
  const handleChange6 = (event) => {
    setSix(event.target.value);
  };
 
  const handleChange7 = (event) => {
    setSeven(event.target.value);
  };
 
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(one==="" || two===""){
      alert("Fill all required details");
    }
    else{
        handleLoading(true);
        var str = one+" "+two+" "+three+" "+four+" "+five+" "+six+" "+seven;
        str=str.trim();
        console.log(cookies.jwtoken)
        const res=await fetch('http://localhost:8000/xyz', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : cookies.jwtoken
          },
          body: JSON.stringify({
            runstr : str
          })
        });
        const data = await res.json();
        console.log(data);
        handleImg1(data.fileTestClfRep)
        handleImg2(data.fileTestConfMat)
        handleImg3(data.fileTrainClfRep)
        handleImg4(data.fileTrainConfMat)
        var str = data.testAcc;
        str = str.substring(0, str.length - 2);
        handleTest(parseFloat(data.testAcc))
        handleTraining(parseFloat(data.trainingAcc))
        handleLoading(false);
      }
  };
 
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Model
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
          <br/>
          <FormControl sx={{ mt: 1 }} required fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Classification</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={one}
                label="Classification"
                onChange={handleChange1}
              >
                <MenuItem value={"bnr"}>Binary</MenuItem>
                <MenuItem value={"mul"}>Multiclass</MenuItem>
              </Select>
          </FormControl>
          <br/>
          <FormControl sx={{ mt: 3 }} required fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Algorithms</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={two}
                label="Algorithms"
                onChange={handleChange2}
              >
                <MenuItem value={"lgr"}>Logistic Regression</MenuItem>
                <MenuItem value={"rfc"}>Random Forest</MenuItem>
                <MenuItem value={"dst"}>Decision Tree</MenuItem>
                <MenuItem value={"nvb"}>Naive Bayes</MenuItem>
                <MenuItem value={"adb"}>AdaBoost</MenuItem>
                <MenuItem value={"ann"}>Artificial Neural Network</MenuItem>
              </Select>
              <FormHelperText>{' '}</FormHelperText>
          </FormControl>
          {  two === "lgr" &&  
              <div>
                <FormControl sx={{ mt: 3 }} required fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Solver</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="solver"
                value={three}
                label="Solver"
                onChange={handleChange3}
              >
                <MenuItem value={"lbfgs"}>lbfgs</MenuItem>
                <MenuItem value={"liblinear"}>liblinear</MenuItem>
                <MenuItem value={"sag"}>sag</MenuItem>
                <MenuItem value={"saga"}>saga</MenuItem>
              </Select>
          </FormControl>
          { solver === "none" ? null :
                   solver === "lbfgs" ? 
                   <FormControl sx={{ mt: 3 }} required fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Penalty Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="penaltyType"
                    value={four}
                    label="penanltyType"
                    onChange={handleChange4}
                  >
                    <MenuItem value={"l2"}>l2</MenuItem>
                    <MenuItem value={"none"}>none</MenuItem>
                  </Select>
                  <FormHelperText>{' '}</FormHelperText>
              </FormControl>
              :
              solver === "liblinear" ? 
              <FormControl sx={{ mt: 3 }} required fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Penalty Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="penaltyType"
                    value={four}
                    label="penanltyType"
                    onChange={handleChange4}
                  >
                    <MenuItem value={"l1"}>l1</MenuItem>
                    <MenuItem value={"l2"}>l2</MenuItem>
                  </Select>
                  <FormHelperText>{' '}</FormHelperText>
              </FormControl> :
               solver === "sag" ? 
               <FormControl sx={{ mt: 3 }} required fullWidth>
               <InputLabel id="demo-simple-select-helper-label">Penalty Type</InputLabel>
               <Select
                 labelId="demo-simple-select-helper-label"
                 id="penaltyType"
                 value={four}
                 label="penanltyType"
                 onChange={handleChange4}
               >
                 <MenuItem value={"l2"}>l2</MenuItem>
                 <MenuItem value={"none"}>none</MenuItem>
               </Select>
               <FormHelperText>{' '}</FormHelperText>
           </FormControl>
              :
                    <FormControl sx={{ mt: 3 }} required fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Penalty Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="penaltyType"
                    value={four}
                    label="penanltyType"
                    onChange={handleChange4}
                  >
                    <MenuItem value={"l1"}>l1</MenuItem>
                    <MenuItem value={"l2"}>l2</MenuItem>
                    <MenuItem value={"none"}>none</MenuItem>
                  </Select>
                  <FormHelperText>With label + helper text</FormHelperText>
              </FormControl>
          }
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="noi"
                  label="Number of Iterations"
                  type="noi"
                  id="noi"
                  onChange={handleChange5}
                  value={five}
                  helperText="Choose any positive integer"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    var value = parseInt(e.target.value, 10);
                    if (value < 0) value = 0;
                    setFive(value);
                  }}
                />
                </div>
          }
          {  two === "rfc" &&  
              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="noe"
                  label="Number of Estimators"
                  name="noe"
                  autoComplete="noe"
                  autoFocus
                  sx={{ mt: 1 }}
                  onChange={handleChange3}
                  value={three}
                  helperText="Choose any positive integer"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    var value = parseInt(e.target.value, 10);
                    if (value < 0) value = 0;
                    setThree(value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="maxDepth"
                  label="Maximum Depth"
                  type="maxDepth"
                  id="maxDepth"
                  onChange={handleChange4}
                  value={four}
                  helperText="Choose any positive integer"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    var value = parseInt(e.target.value, 10);
                    if (value < 0) value = 0;
                    setFour(value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="mss"
                  label="Maximum Samples Split"
                  type="mss"
                  id="mss"
                  onChange={handleChange5}
                  value={five}
                  helperText="Choose any positive integer"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    var value = parseInt(e.target.value, 10);
                    if (value < 0) value = 0;
                    setFive(value);
                  }}
                />
                <FormControl sx={{ mt: 1 }} required fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Maximum Features For Splitting</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={six}
                label="Maximum Features For Splitting"
                onChange={handleChange6}
              >
                <MenuItem value={"auto"}>Auto</MenuItem>
                <MenuItem value={"sqrt"}>Sqrt</MenuItem>
                <MenuItem value={"log2"}>Log2</MenuItem>
              </Select>
          </FormControl>
                </div>
          }
          {  two === "dst" &&  
              <div>
                <FormControl sx={{ mt: 1 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Splitting Criterion</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={three}
                label="Splitting Criterion"
                onChange={handleChange3}
              >
                <MenuItem value={"gini"}>Gini</MenuItem>
                <MenuItem value={"entropy"}>Entropy</MenuItem>
              </Select>
          </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="md"
                  label="Maximum Depth"
                  type="md"
                  id="md"
                  onChange={handleChange4}
                  value={four}
                  helperText="Choose any positive integer"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    var value = parseInt(e.target.value, 10);
                    if (value < 0) value = 0;
                    setFour(value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="mss"
                  label="Maximum Samples Split"
                  type="mss"
                  id="mss"
                  onChange={handleChange5}
                  value={five}
                  helperText="Choose any positive integer"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    var value = parseInt(e.target.value, 10);
                    if (value < 0) value = 0;
                    setFive(value);
                  }}
                />
                 <FormControl sx={{ mt: 1 }} required fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Maximum Features For Splitting</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={six}
                label="Maximum Features For Splitting"
                onChange={handleChange6}
              >
                <MenuItem value={"auto"}>Auto</MenuItem>
                <MenuItem value={"sqrt"}>Sqrt</MenuItem>
                <MenuItem value={"log2"}>Log2</MenuItem>
              </Select>
          </FormControl>
                </div>
          }
          {  two === "nvb" &&  
              <div>
                <FormControl sx={{ mt: 3 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Sub Classifier</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={three}
                label="Sub Classifier"
                onChange={handleChange3}
              >
                <MenuItem value={"bnb"}>Bernoulli NB</MenuItem>
                <MenuItem value={"gnb"}>Gaussian NB</MenuItem>
              </Select>
              {/* <FormHelperText>With label + helper text</FormHelperText> */}
          </FormControl>
                </div>
          }
          {  two === "adb" &&  
              <div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="noe"
                  label="Number of Estimators"
                  name="noe"
                  autoComplete="noe"
                  autoFocus
                  sx={{ mt: 1 }}
                  onChange={handleChange3}
                  value={three}
                  helperText="Choose any positive integer"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    var value = parseInt(e.target.value, 10);
                    if (value < 0) value = 0;
                    setThree(value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="lrv"
                  label="Learning Rate Value"
                  type="lrv"
                  id="lrv"
                  onChange={handleChange4}
                  value={four}
                  helperText="Choose any floating number"
                  type="number"
                  InputProps={{ inputProps: { min: 0, steps:'any' } }}
                  onChange={(e) => {
                    var value = parseInt(e.target.value, 10);
                    if (value < 0) value = 0;
                    setFour(value);
                  }}
                />
                </div>
          }
          {  two === "ann" &&  
              <div>
                <FormControl sx={{ mt: 3 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Activation</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="solver"
                value={three}
                label="Activation"
                onChange={handleChange3}
              >
                <MenuItem value={"logistic"}>Logistic</MenuItem>
                <MenuItem value={"tanh"}>Tanh</MenuItem>
                <MenuItem value={"relu"}>Relu</MenuItem>
              </Select>
              {/* <FormHelperText>With label + helper text</FormHelperText> */}
          </FormControl>
                <FormControl sx={{ mt: 3 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Solver</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="solver"
                value={four}
                label="Solver"
                onChange={handleChange4}
              >
                <MenuItem value={"lbfgs"}>lbfgs</MenuItem>
                <MenuItem value={"adam"}>adam</MenuItem>
              </Select>
              <FormHelperText>{' '}</FormHelperText>
          </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="bs"
                  label="Batch Size"
                  name="bs"
                  autoFocus
                  sx={{ mt: 1 }}
                  onChange={handleChange5}
                  value={five}
                  type="number"
                  helperText="Input any integer from 0 to 20000"
                  InputProps={{ inputProps: { min: 0, max:20000 } }}
                  onChange={(e) => {
                    var value = parseInt(e.target.value, 10);
                    if (value < 0) value = 0;
                    if (value >20000) value = 0;
                    setFive(value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="noi"
                  label="Number of iterations"
                  name="noi"
                  autoFocus
                  sx={{ mt: 1 }}
                  onChange={handleChange6}
                  value={six}
                  type="number"
                  helperText="Input any positive integer"
                  InputProps={{ inputProps: { min: 0} }}
                  onChange={(e) => {
                    var value = parseInt(e.target.value, 10);
                    if (value < 0) value = 0;
                    setSix(value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="alpha"
                  label="Alpha"
                  name="alpha"
                  autoFocus
                  sx={{ mt: 1 }}
                  onChange={handleChange7}
                  value={seven}
                  type="number"
                  helperText="Input any flosting poiny number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    var value = parseInt(e.target.value, 10);
                    if (value < 0) value = 0;
                    setSeven(value);
                  }}
                />
                </div>
          }
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              disabled
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SUBMIT
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}