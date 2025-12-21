import { useState } from 'react';
import api from '../api/axios';
import { 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  FaEye, 
  FaEyeSlash,
  FaCheckCircle,
  FaGoogle,
  FaGithub 
} from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear message when user starts typing
    if (message.text) setMessage({ text: '', type: '' });
    
    // Check password strength and criteria
    if (name === 'password') {
      checkPasswordStrength(value);
    }
    
    // Check if passwords match
    if (name === 'password_confirmation') {
      if (form.password !== value && value.length > 0) {
        setMessage({ text: 'Passwords do not match', type: 'error' });
      } else if (message.text === 'Passwords do not match') {
        setMessage({ text: '', type: '' });
      }
    }
  };

  const checkPasswordStrength = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
    
    setPasswordCriteria(criteria);
    
    // Calculate strength (0-4)
    const strength = Object.values(criteria).filter(Boolean).length;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return 'bg-gray-200';
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      case 5: return 'bg-emerald-600';
      default: return 'bg-gray-200';
    }
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0: return 'Very weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      case 5: return 'Very strong';
      default: return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (form.password !== form.password_confirmation) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    
    // Validate password strength
    if (passwordStrength < 3) {
      setMessage({ text: 'Please use a stronger password', type: 'error' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await api.post('/register', form);
      setMessage({ 
        text: 'Registration successful! You will be redirected to login.', 
        type: 'success' 
      });
      console.log(response.data);
      
      // Clear form on successful registration
      setForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      });
      
      // Redirect to login after delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Registration failed. Please try again.', 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">
        {/* Registration Form */}
        <div className="bg-white p-8">
          <div className="mb-8 text-center">
            <div className="mb-6 inline-flex items-center justify-center">
              <div className="mr-3 rounded-xl bg-indigo-600 p-3">
                <MdPassword className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            </div>
            <p className="text-gray-600">Fill in your details to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-4 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  required
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-4 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  required
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-4 pl-10 pr-12 text-gray-800 placeholder-gray-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {form.password && (
                <div className="mt-3">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-600">Password strength</span>
                    <span className={`font-medium ${
                      passwordStrength <= 2 ? 'text-red-600' : 
                      passwordStrength <= 3 ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div 
                      className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Password Criteria */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className={`flex items-center text-sm ${passwordCriteria.length ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordCriteria.length ? (
                        <FaCheckCircle className="mr-2 h-4 w-4" />
                      ) : (
                        <div className="mr-2 h-2 w-2 rounded-full bg-gray-300"></div>
                      )}
                      <span>8+ characters</span>
                    </div>
                    <div className={`flex items-center text-sm ${passwordCriteria.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordCriteria.uppercase ? (
                        <FaCheckCircle className="mr-2 h-4 w-4" />
                      ) : (
                        <div className="mr-2 h-2 w-2 rounded-full bg-gray-300"></div>
                      )}
                      <span>Uppercase letter</span>
                    </div>
                    <div className={`flex items-center text-sm ${passwordCriteria.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordCriteria.lowercase ? (
                        <FaCheckCircle className="mr-2 h-4 w-4" />
                      ) : (
                        <div className="mr-2 h-2 w-2 rounded-full bg-gray-300"></div>
                      )}
                      <span>Lowercase letter</span>
                    </div>
                    <div className={`flex items-center text-sm ${passwordCriteria.number ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordCriteria.number ? (
                        <FaCheckCircle className="mr-2 h-4 w-4" />
                      ) : (
                        <div className="mr-2 h-2 w-2 rounded-full bg-gray-300"></div>
                      )}
                      <span>Number</span>
                    </div>
                    <div className={`flex items-center text-sm ${passwordCriteria.special ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordCriteria.special ? (
                        <FaCheckCircle className="mr-2 h-4 w-4" />
                      ) : (
                        <div className="mr-2 h-2 w-2 rounded-full bg-gray-300"></div>
                      )}
                      <span>Special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Confirm Password Field */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  placeholder="Confirm your password"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  className={`w-full rounded-xl border py-4 pl-10 pr-12 text-gray-800 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 ${
                    form.password_confirmation && form.password !== form.password_confirmation
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {form.password_confirmation && form.password !== form.password_confirmation && (
                <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>
            
            {/* Terms and Conditions */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
              </label>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-xl py-4 font-semibold text-white transition-all ${isLoading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
            
            {/* Message Display */}
            {message.text && (
              <div className={`rounded-xl p-4 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <div className="flex items-center">
                  {message.type === 'success' ? (
                    <FaCheckCircle className="mr-3 h-5 w-5 text-green-500" />
                  ) : (
                    <div className="mr-3 h-5 w-5 text-red-500">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  )}
                  <span>{message.text}</span>
                </div>
              </div>
            )}
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">Or sign up with</span>
              </div>
            </div>
            
            {/* Social Registration Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center rounded-xl border border-gray-300 py-3 px-4 transition-all hover:bg-gray-50"
              >
                <FaGoogle className="mr-2 h-5 w-5 text-red-500" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-xl border border-gray-300 py-3 px-4 transition-all hover:bg-gray-50"
              >
                <FaGithub className="mr-2 h-5 w-5 text-gray-800" />
                GitHub
              </button>
            </div>
          </form>
          
          {/* Login link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}