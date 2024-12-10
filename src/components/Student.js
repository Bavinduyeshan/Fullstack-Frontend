import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';  // Import MUI components
import axios from 'axios';  // Import axios for HTTP requests

export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    
    fetch('http://localhost:8080/student/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    }).then(() => {
      console.log('New Student added');
      // Clear input fields after submitting
      setName('');
      setAddress('');
    });
  };

  useEffect(() => {
    fetch('http://localhost:8080/student/getAll')
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h4" color="primary" gutterBottom>
          Add Student
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <TextField
            id="outlined-basic"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </form>
      </Paper>

      <Typography variant="h5" color="primary" style={{ marginTop: 20 }}>
        Students
      </Typography>
      <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
            key={student.id}
          >
            <Typography>Id: {student.id}</Typography>
            <Typography>Name: {student.name}</Typography>
            <Typography>Address: {student.address}</Typography>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
