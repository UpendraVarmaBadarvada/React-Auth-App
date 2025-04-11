import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Table, TableBody, TableCell, TableRow, Paper } from "@mui/material";

const LoginSuccess = () => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setUserDetails(data);
          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserDetails();
    }, [userId]);
  
    if (loading) {
      return <CircularProgress />;
    }
  
    if (!userDetails) {
      return <Typography>User not found</Typography>;
    }
  
    return (
      <Container>
        <Typography variant="h4">Successfully logged in to User ID: {userId}</Typography>
        <Paper>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>{userDetails.firstname}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell>{userDetails.lastname}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>{userDetails.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Contact Info</TableCell>
                <TableCell>{userDetails.contactinfo}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Container>
    );
  };
  
  export default LoginSuccess;