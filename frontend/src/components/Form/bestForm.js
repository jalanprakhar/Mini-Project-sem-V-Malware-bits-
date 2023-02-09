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

export default function BestForm(props) {
  const {isLoading, arrstr} = props;
  const [cookies, setCookie] = useCookies({});

  
  const [solver , setSolver] = React.useState("none");

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
            noValidate
            sx={{ mt: 1 }}
          >
          <br/>
          <FormControl sx={{ mt: 1 }} required fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Classification</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={arrstr[0]}
                label="Classification"
                disabled
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
                value={arrstr[1]}
                label="Algorithms"
                disabled
              >
                <MenuItem value={"lgr"}>Logistic Regression</MenuItem>
                <MenuItem value={"rfc"}>Random Forest</MenuItem>
                <MenuItem value={"dst"}>Decision Tree</MenuItem>
                <MenuItem value={"nvb"}>Naive Bayes</MenuItem>
                <MenuItem value={"adb"}>AdaBoost</MenuItem>
                <MenuItem value={"ann"}>Artificial Neural Network</MenuItem>
              </Select>
              <FormHelperText>With label + helper text</FormHelperText>
          </FormControl>
          {  arrstr[1] === "lgr" &&  
              <div>
                <FormControl sx={{ mt: 3 }} required fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Solver</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="solver"
                value={arrstr[2]}
                label="Solver"
                disabled
              >
                <MenuItem value={"lbfgs"}>lbfgs</MenuItem>
                <MenuItem value={"liblinear"}>liblinear</MenuItem>
                <MenuItem value={"sag"}>sag</MenuItem>
                <MenuItem value={"saga"}>saga</MenuItem>
              </Select>
              <FormHelperText>With label + helper text</FormHelperText>
          </FormControl>
          { solver === "none" ? null :
                   solver === "lbfgs" ? 
                   <FormControl sx={{ mt: 3 }} required fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Penalty Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="penaltyType"
                    value={arrstr[3]}
                    label="penanltyType"
                  >
                    <MenuItem value={"l2"}>l2</MenuItem>
                    <MenuItem value={"none"}>none</MenuItem>
                  </Select>
                  <FormHelperText>With label + helper text</FormHelperText>
              </FormControl>
              :
              solver === "liblinear" ? 
              <FormControl sx={{ mt: 3 }} required fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Penalty Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="penaltyType"
                    value={arrstr[3]}
                    label="penanltyType"
                  >
                    <MenuItem value={"l1"}>l1</MenuItem>
                    <MenuItem value={"l2"}>l2</MenuItem>
                  </Select>
                  <FormHelperText>With label + helper text</FormHelperText>
              </FormControl> :
               solver === "sag" ? 
               <FormControl sx={{ mt: 3 }} required fullWidth>
               <InputLabel id="demo-simple-select-helper-label">Penalty Type</InputLabel>
               <Select
                 labelId="demo-simple-select-helper-label"
                 id="penaltyType"
                 value={arrstr[3]}
                 label="penanltyType"
               >
                 <MenuItem value={"l2"}>l2</MenuItem>
                 <MenuItem value={"none"}>none</MenuItem>
               </Select>
               <FormHelperText>With label + helper text</FormHelperText>
           </FormControl>
              :
                    <FormControl sx={{ mt: 3 }} required fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">Penalty Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="penaltyType"
                    value={arrstr[3]}
                    label="penanltyType"
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
                  value={arrstr[4]}
                  disabled
                />
                </div>
          }
          {  arrstr[1] === "rfc" &&  
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
                  disabled
                  value={arrstr[2]}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="maxDepth"
                  label="Maximum Depth"
                  type="maxDepth"
                  id="maxDepth"
                  disabled
                  value={arrstr[3]}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="mss"
                  label="Maximum Samples Split"
                  type="mss"
                  id="mss"
                  disabled
                  value={arrstr[4]}
                />
                <FormControl sx={{ mt: 1 }} required fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Maximum Features For Splitting</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={arrstr[5]}
                label="Maximum Features For Splitting"
                disabled
              >
                <MenuItem value={"auto"}>Auto</MenuItem>
                <MenuItem value={"sqrt"}>Sqrt</MenuItem>
                <MenuItem value={"log2"}>Log2</MenuItem>
              </Select>
          </FormControl>
                </div>
          }
          {  arrstr[1] === "dst" &&  
              <div>
                <FormControl sx={{ mt: 1 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Splitting Criterion</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={arrstr[2]}
                label="Splitting Criterion"
                disabled
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
                  disabled
                  value={arrstr[3]}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="mss"
                  label="Maximum Samples Split"
                  type="mss"
                  id="mss"
                  disabled
                  value={arrstr[4]}
                />
                 <FormControl sx={{ mt: 1 }} required fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Maximum Features For Splitting</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={arrstr[5]}
                label="Maximum Features For Splitting"
                disabled
              >
                <MenuItem value={"auto"}>Auto</MenuItem>
                <MenuItem value={"sqrt"}>Sqrt</MenuItem>
                <MenuItem value={"log2"}>Log2</MenuItem>
              </Select>
          </FormControl>
                </div>
          }
          {  arrstr[1] === "nvb" &&  
              <div>
                <FormControl sx={{ mt: 3 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Sub Classifier</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={arrstr[2]}
                label="Sub Classifier"
                disabled
              >
                <MenuItem value={"bnb"}>Bernoulli NB</MenuItem>
                <MenuItem value={"gnb"}>Gaussian NB</MenuItem>
              </Select>
              <FormHelperText>With label + helper text</FormHelperText>
          </FormControl>
                </div>
          }
          {  arrstr[1] === "adb" &&  
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
                  disabled
                  value={arrstr[2]}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="lrv"
                  label="Learning Rate Value"
                  type="lrv"
                  id="lrv"
                  disabled
                  value={arrstr[3]}
                />
                </div>
          }
          {  arrstr[1] === "ann" &&  
              <div>
                <FormControl sx={{ mt: 3 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Activation</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="solver"
                value={arrstr[2]}
                label="Activation"
                disabled
              >
                <MenuItem value={"logistic"}>Logistic</MenuItem>
                <MenuItem value={"tanh"}>Tanh</MenuItem>
                <MenuItem value={"relu"}>Relu</MenuItem>
              </Select>
              <FormHelperText>With label + helper text</FormHelperText>
          </FormControl>
                <FormControl sx={{ mt: 3 }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Solver</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="solver"
                value={arrstr[3]}
                label="Solver"
                disabled
              >
                <MenuItem value={"lbfgs"}>lbfgs</MenuItem>
                <MenuItem value={"adam"}>adam</MenuItem>
              </Select>
              <FormHelperText>With label + helper text</FormHelperText>
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
                  disabled
                  value={arrstr[4]}
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
                  disabled
                  value={arrstr[5]}
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
                  disabled
                  value={arrstr[6]}
                />
                </div>
          }
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              disabled
              label="Remember me"
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
