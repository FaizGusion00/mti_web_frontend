import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, OtpVerificationData } from '../services/auth.service';

interface VerifyOtpFormProps {
  email: string;
  onSuccess?: () => void;
}

const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({ email, onSuccess }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  const [resendSuccess, setResendSuccess] = useState<boolean>(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data: OtpVerificationData = {
        email,
        otp
      };

      const response = await authService.verifyOtp(data);
      
      if (response.status === 'success') {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/login');
        }
      } else {
        setError(response.message || 'Verification failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP or verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendSuccess(false);
    setError(null);
    
    try {
      const response = await authService.resendOtp(email);
      
      if (response.status === 'success') {
        setResendSuccess(true);
        setTimeout(() => {
          setResendSuccess(false);
        }, 5000);
      } else {
        setError(response.message || 'Failed to resend OTP');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to {email}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleVerify}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          
          {resendSuccess && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">OTP sent successfully. Please check your email.</div>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="otp" className="sr-only">Verification Code</label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter 6-digit verification code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
                className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
              >
                {resendLoading ? 'Sending...' : 'Resend Code'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpForm; 