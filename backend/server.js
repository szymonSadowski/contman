const express = require('express');
const users = require('./user.json');
const companies = require('./companies.json');

const app = express();

app.get('/users', (req, res) => res.json(users));

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
});

app.get('/companies', (req, res) => res.json(companies));

app.get('/companies/:id', (req, res) => {
  const company = companies.find(c => c.id === req.params.id);
  company ? res.json(company) : res.status(404).json({ error: 'Company not found' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
