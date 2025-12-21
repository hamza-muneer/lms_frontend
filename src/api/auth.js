    import api from './axios';

// Function to refresh token
export const refreshToken = async () => {
  try {
    const response = await api.post('/refresh-token', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
    localStorage.setItem('access_token', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

// Function to logout
export const logout = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};
