import React, { useState } from "react";
import { Container, TextField, Button, Typography, InputAdornment, Snackbar, Alert } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    address: "",
    contactInfo: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if(isRegister){
      Object.keys(formData).forEach((key) => {
        if (!formData[key].trim()) {
            newErrors[key] = "This field is required";
          }
      });
      if (formData.password && formData.confirmPassword) {
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
      }
    }
    else{
      Object.keys(formData).forEach((key) => {
        if ((key == "userId" || key == "password") && !formData[key].trim()) {
            newErrors[key] = "This field is required";
          }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      if (isRegister) {
        try {
          const response = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          if (response.ok) {
            setAlert({ open: true, message: "Registration Successful!", severity: "success" });
            setFormData({
              userId: "",
              password: "",
              confirmPassword: "",
              firstName: "",
              lastName: "",
              address: "",
              contactInfo: "",
            });
          } else {
            setAlert({ open: true, message: data.message || "Registration Failed!", severity: "error" });
          }
        } catch (error) {
          setAlert({ open: true, message: "An error occurred. Please try again.", severity: "error" });
        }
      } else {
        try {
          const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: formData.userId, password: formData.password }),
          });
          const data = await response.json();
          if (response.ok) {
            navigate(`/success/${formData.userId}`);
          } else {
            setAlert({ open: true, message: data.message || "Login Failed!", severity: "error" });
          }
        } catch (error) {
          setAlert({ open: true, message: "An error occurred. Please try again.", severity: "error" });
        }
      }
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="background-container">
      <Container maxWidth="sm" className="auth-container">
        <form className="auth-form" component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" align="center" gutterBottom>
            {isRegister ? "Register" : "Login"}
          </Typography>
          <div>
            <TextField
              label="User ID*"
              name="userId"
              fullWidth
              margin="normal"
              error={!!errors.userId}
              helperText={errors.userId}
              value={formData.userId} 
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              label="Password*"
              type="password"
              name="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
              value={formData.password} 
              onChange={handleChange}
              InputProps={{
                endAdornment:
                  isRegister &&
                  formData.password &&
                  formData.confirmPassword &&
                  formData.password === formData.confirmPassword ? (
                    <InputAdornment position="end">
                      <CheckCircle color="success" />
                    </InputAdornment>
                  ) : null,
              }}
            />
          </div>
          {isRegister && (
            <>
              <div>
                <TextField
                  label="Confirm Password*"
                  type="password"
                  name="confirmPassword"
                  fullWidth
                  margin="normal"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  value={formData.confirmPassword} 
                  onChange={handleChange}
                  InputProps={{
                    endAdornment:
                      formData.password &&
                      formData.confirmPassword &&
                      formData.password === formData.confirmPassword ? (
                        <InputAdornment position="end">
                          <CheckCircle color="success" />
                        </InputAdornment>
                      ) : null,
                  }}
                />
              </div>
              <div>
                <TextField label="First Name*" name="firstName" fullWidth margin="normal" value={formData.firstName} error={!!errors.firstName} helperText={errors.firstName} onChange={handleChange} />
              </div>
              <div>
                <TextField label="Last Name*" name="lastName" fullWidth margin="normal" value={formData.lastName} error={!!errors.lastName} helperText={errors.lastName} onChange={handleChange} />
              </div>
              <div>
                <TextField label="Address*" name="address" fullWidth margin="normal" value={formData.address} error={!!errors.address} helperText={errors.address} onChange={handleChange} />
              </div>
              <div>
                <TextField label="Contact Info*" name="contactInfo" fullWidth margin="normal" value={formData.contactInfo} error={!!errors.contactInfo} helperText={errors.contactInfo} onChange={handleChange} />
              </div>
            </>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isRegister ? "Register" : "Login"}
          </Button>
          {isRegister && (
            <Button
            type="button"
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() =>
              setFormData({
                userId: "",
                password: "",
                confirmPassword: "",
                firstName: "",
                lastName: "",
                address: "",
                contactInfo: "",
              })
            }
          >
            Reset Form
          </Button>          
          )}
          <Button type="button" variant="text" color="primary" fullWidth onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Switch to Login" : "Switch to Register"}
          </Button>
        </form>
        <Snackbar open={alert.open} autoHideDuration={3000} onClose={() => setAlert({ ...alert, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity={alert.severity}
            onClose={() => setAlert({ ...alert, open: false })}
            sx={{
              width: "100%",
              fontSize: "1.2rem", // Larger font size
              padding: "20px", // Add padding for a bigger alert
            }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default AuthForm;
