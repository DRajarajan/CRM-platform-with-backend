import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { motion } from 'framer-motion';
import { GanttChartSquare, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface GoogleUserData {
  name?: string;
  email?: string;
  picture?: string;
  sub?: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [showPrivacyTip, setShowPrivacyTip] = useState(false);

  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error('No credentials received');
      }

      // Decode JWT token to get user information
      const decoded = jwtDecode<GoogleUserData>(credentialResponse.credential);
      
      if (!decoded.sub) {
        throw new Error('Invalid user data received');
      }

      // Store user data
      login({
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Authentication failed. Please try again.');
      setShowPrivacyTip(false);
    }
  };

  const handleGoogleLoginError = (error: any) => {
    console.error('Google login error:', error);
    
    // Check if the error is related to FedCM/Privacy settings
    if (error?.error === 'AbortError' || error?.message?.includes('AbortError')) {
      setError('Sign-in was interrupted. This might be due to browser privacy settings.');
      setShowPrivacyTip(true);
    } else if (error?.error === 'popup_closed_by_user') {
      setError('Sign-in window was closed. Please try again.');
      setShowPrivacyTip(false);
    } else if (error?.error === 'invalid_client') {
      setError('Authentication configuration error. Please contact support.');
      setShowPrivacyTip(false);
    } else {
      setError('Google authentication failed. Please try again.');
      setShowPrivacyTip(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-8 text-center lg:hidden">
        <div className="mb-4 flex justify-center">
          <GanttChartSquare size={48} className="text-primary-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">InsightCRM</h1>
        <p className="mt-2 text-gray-600">Modern customer relationship management</p>
      </div>
      
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">Welcome back</h2>
        
        {error && (
          <div className="mb-4 rounded-md bg-error-50 p-4 text-sm text-error-800">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
            {showPrivacyTip && (
              <div className="mt-2 text-sm">
                <p>Try these steps:</p>
                <ul className="list-disc ml-4 mt-1">
                  <li>Check if third-party cookies are enabled in your browser settings</li>
                  <li>Disable any privacy-focused browser extensions temporarily</li>
                  <li>Try using a different browser</li>
                </ul>
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            useOneTap
            theme="outline"
            shape="rectangular"
            size="large"
            text="signin_with"
            locale="en"
          />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            By continuing, you agree to the{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;