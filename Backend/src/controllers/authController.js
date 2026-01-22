import supabase from '../config/supabase.js';
import cookie from 'cookie';

/* REGISTER */
export const register = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(400).json({ error: error.message });

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

  if (error) return res.status(401).json({ error: error.message });

  // Set tokens in httpOnly cookies
  const isProduction = process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie', [
    cookie.serialize('sb_access', data.session.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hour, but will be refreshed
    }),
    cookie.serialize('sb_refresh', data.session.refresh_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  ]);

  res.json({ message: 'Login successful', user: data.user });
};

/* LOGOUT */
export const logout = async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  // Clear cookies
  res.setHeader('Set-Cookie', [
    cookie.serialize('sb_access', '', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      expires: new Date(0),
    }),
    cookie.serialize('sb_refresh', '', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      expires: new Date(0),
    })
  ]);
  res.json({ message: 'Logged out successfully' });
};

/* GET ACTIVE SESSION */
export const getSession = async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const accessToken = cookies.sb_access;
  const refreshToken = cookies.sb_refresh;

  if (!accessToken || !refreshToken) return res.status(401).json({ error: 'No session' });

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error || !data.session) return res.status(401).json({ error: 'Invalid session' });

  res.json({ user: data.user });
};

/* FORGOT PASSWORD */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/reset-password',
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Password reset email sent' });
};
