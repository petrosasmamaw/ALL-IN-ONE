import supabase from '../config/supabase.js';

/* REGISTER */
export const register = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({
    message: 'Registered successfully. Check email for verification.',
    user: data.user,
  });
};

/* LOGIN */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  res.json({
    message: 'Login successful',
    session: data.session,
    user: data.user,
  });
};

/* LOGOUT */
export const logout = async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: 'Logged out successfully' });
};

/* GET ACTIVE SESSION */
export const getSession = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  res.json({ user: data.user });
};

/* FORGOT PASSWORD */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/reset-password',
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: 'Password reset email sent' });
};
