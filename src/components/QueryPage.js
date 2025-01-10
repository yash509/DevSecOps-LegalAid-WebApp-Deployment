import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
} from '@mui/material';

const QueryPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFetchResults = async () => {
    if (!query.trim()) {
      setError('Please enter a valid query.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://0.0.0.0:8000/ask', { query });
      setResults(response.data.cases || []);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: '#e8f5e9', // Light green background for the entire page
        minHeight: '100vh',
        paddingTop: '50px',
        paddingBottom: '50px',
      }}
    >
      <Container maxWidth="md">
        <Card
          style={{
            padding: '30px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ color: '#2e7d32' }} // Dark green text color
          >
            LegalAid Query System
          </Typography>
          <TextField
            fullWidth
            label="Enter your query"
            value={query}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            InputProps={{
              style: {
                color: '#000000', // Black text color
              },
            }}
            InputLabelProps={{
              style: { color: '#2e7d32' }, // Dark green label color
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleFetchResults}
            disabled={loading}
            style={{
              marginTop: '20px',
              backgroundColor: '#4caf50', // Green button background
              color: '#ffffff', // White text color
              padding: '10px',
              fontSize: '16px',
            }}
          >
            {loading ? 'Fetching...' : 'Search'}
          </Button>
          {error && (
            <Typography
              color="error"
              align="center"
              style={{ marginTop: '20px' }}
            >
              {error}
            </Typography>
          )}
        </Card>

        {results.length > 0 && (
          <Grid container spacing={3} style={{ marginTop: '30px' }}>
            {results.map((result) => (
              <Grid item xs={12} key={result.case_id}>
                <Card
                  style={{
                    backgroundColor: '#ffffff', // Updated background color to white or remove background color
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="subtitle2"
                      style={{ color: '#388e3c', marginBottom: '5px' }}
                    >
                      {result.court} |{' '}
                      {new Date(result.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" style={{ color: '#000000' }}>
                      {result.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default QueryPage;
