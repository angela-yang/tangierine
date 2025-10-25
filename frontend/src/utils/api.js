export const createUser = async (username, email) => {
  const res = await fetch('http://localhost:3001/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email }),
  });
  return res.json();
};

export const createCommission = async (userId, title, description) => {
  const res = await fetch('http://localhost:3001/api/commissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, title, description }),
  });
  return res.json();
};

export const getCommissions = async () => {
  const res = await fetch("http://localhost:3001/api/commissions");
  return res.json();
};

export const sendMessage = async (userId, message) => {
  const res = await fetch('http://localhost:3001/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, message }),
  });
  return res.json();
};
