'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { authService, RegisterData } from '../../src/services/auth.service';
import Environment from '../utils/environment';
import { EyeIcon, EyeSlashIcon, CheckIcon, XMarkIcon, UserIcon, CameraIcon } from '@heroicons/react/24/outline';
import { cn } from '../utils/cn';

// Dynamically import Turnstile to avoid SSR issues
const Turnstile = dynamic(() => import('react-turnstile'), { ssr: false });

// Professional Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-3 px-4 md:px-6 transition-all duration-300",
          isScrolled 
            ? "bg-black/80 backdrop-blur-md border-b border-blue-500/20" 
            : "bg-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 relative overflow-hidden">
                <Image 
                  src="/logo.png" 
                  alt="MTI Logo" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold flex items-center">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 ml-1">META TRAVEL INTERNATIONAL</span>
                </h1>
              </div>
            </Link>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex gap-2"
            >
              <Link 
                href="/" 
                className="relative group inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium rounded-md border border-gray-600 hover:border-blue-500 transition-all duration-300"
              >
                <span className="relative text-white font-semibold group-hover:text-blue-400 transition-colors">Home</span>
              </Link>
              <Link 
                href="https://app.metatravel.ai" 
                className="relative group inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium rounded-md"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-blue-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                <span className="relative text-black font-semibold">Login</span>
              </Link>
            </motion.div>
          </nav>
          
          <motion.button
            className="md:hidden text-white text-2xl focus:outline-none z-50"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-8 h-8">
              <span className={`absolute block h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
              <span className={`absolute block h-0.5 w-full bg-current transform transition duration-200 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute block h-0.5 w-full bg-current transform transition duration-500 ease-in-out ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
            </div>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-gradient-to-b from-black via-blue-950/90 to-black backdrop-blur-md pt-24 px-6"
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col space-y-6 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-xs space-y-4"
              >
                <Link 
                  href="/" 
                  className="flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white rounded-lg border border-gray-600 hover:border-blue-500 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="https://app.metatravel.ai" 
                  className="flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-black rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Success/Error Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
  showOtpInput?: boolean;
  onOtpSubmit?: (otp: string) => void;
  onResendOtp?: () => void;
  isOtpLoading?: boolean;
  email?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  showOtpInput = false,
  onOtpSubmit,
  onResendOtp,
  isOtpLoading = false,
  email
}) => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      onOtpSubmit?.(otp);
    } else {
      setOtpError('Please enter a valid 6-digit OTP');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          className="relative w-full max-w-md mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              {type === 'success' ? (
                <motion.div 
                  className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <CheckIcon className="w-8 h-8 text-green-400" />
                </motion.div>
              ) : (
                <motion.div 
                  className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <XMarkIcon className="w-8 h-8 text-red-400" />
                </motion.div>
              )}
            </div>
            
            <h3 className="text-xl font-semibold text-white text-center mb-3">{title}</h3>
            <p className="text-gray-300 text-center mb-8">{message}</p>

            {showOtpInput && (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-3 text-center">
                    Enter verification code sent to {email}
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(value);
                      setOtpError('');
                    }}
                    className="w-full px-4 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white text-center text-2xl tracking-[0.5em] font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    placeholder="000000"
                    maxLength={6}
                    disabled={isOtpLoading}
                  />
                  {otpError && <p className="text-red-400 text-sm mt-2 text-center">{otpError}</p>}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={isOtpLoading || otp.length !== 6}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                  >
                    {isOtpLoading ? 'Verifying...' : 'Verify'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={onResendOtp}
                    disabled={isOtpLoading}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                  >
                    {isOtpLoading ? 'Sending...' : 'Resend'}
                  </button>
                </div>
              </form>
            )}

            {!showOtpInput && (
              <div className="flex justify-center">
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  {type === 'success' ? 'Continue' : 'Try Again'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Password Strength Component
interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-red-500', 'bg-red-400', 'bg-yellow-500', 'bg-green-400', 'bg-green-500'];

  if (!password) return null;

  return (
    <div className="mt-3">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i < strength ? strengthColors[strength - 1] : 'bg-gray-600'
            }`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">
        {strengthLabels[strength - 1] || 'Very Weak'}
      </p>
    </div>
  );
};

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  
  // Modal states
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
    showOtpInput?: boolean;
    email?: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

  // Form state
  const [formData, setFormData] = useState<RegisterData>({
    full_name: '',
    username: '',
    email: '',
    phonenumber: '',
    address: '',
    date_of_birth: '',
    referral_id: '',
    password: '',
    password_confirmation: '',
  });

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Check OTP status and handle referral code from URL
  useEffect(() => {
    const initializeForm = async () => {
      // Check OTP status
      try {
        const otpStatus = await authService.checkOtpStatus();
        setOtpEnabled(otpStatus.otp_enabled);
        console.log('OTP enabled:', otpStatus.otp_enabled);
      } catch (error) {
        console.error('Failed to check OTP status:', error);
        setOtpEnabled(false);
      }

      // Handle referral code from URL
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const affiliateCode = urlParams.get('affiliate_code');
        if (affiliateCode) {
          setFormData(prev => ({ ...prev, referral_id: affiliateCode }));
        }
      }
    };

    initializeForm();
  }, []);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'full_name':
        return value.length < 2 ? 'Full name must be at least 2 characters' : '';
      case 'username':
        return value.length < 3 ? 'Username must be at least 3 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : '';
      case 'phonenumber':
        return value.length < 10 ? 'Phone number must be at least 10 digits' : '';
      case 'date_of_birth':
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age < 18 ? 'You must be at least 18 years old' : '';
      case 'password':
        return value.length < 8 ? 'Password must be at least 8 characters' : '';
      case 'password_confirmation':
        return value !== formData.password ? 'Passwords do not match' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Real-time validation
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profile_image: 'Please select a valid image file' }));
        return;
      }
      
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profile_image: 'Image size must be less than 2MB' }));
        return;
      }
      
      setSelectedImage(file);
      setErrors(prev => ({ ...prev, profile_image: '' }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
  };

  const handleCaptchaError = () => {
    setCaptchaToken(null);
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    // Required field validation
    const requiredFields = ['full_name', 'username', 'email', 'phonenumber', 'date_of_birth', 'password', 'password_confirmation'];
    requiredFields.forEach(field => {
      if (!formData[field as keyof RegisterData]) {
        newErrors[field] = 'This field is required';
      } else {
        const error = validateField(field, formData[field as keyof RegisterData] as string);
        if (error) newErrors[field] = error;
      }
    });

    // Captcha validation
    if (!captchaToken) {
      newErrors.captcha = 'Please complete the captcha verification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const registerData: RegisterData = {
          full_name: formData.full_name,
          username: formData.username,
          email: formData.email,
          phonenumber: formData.phonenumber,
          address: formData.address,
          date_of_birth: formData.date_of_birth,
          referral_id: formData.referral_id,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        profile_image: selectedImage || undefined
      };

      const response = await authService.register(registerData);

      if (response.status === 'success') {
        if (otpEnabled) {
          // Show OTP verification modal
          setModal({
            isOpen: true,
            type: 'success',
            title: 'Verify Your Email',
            message: 'We\'ve sent a verification code to your email address.',
            showOtpInput: true,
            email: formData.email
          });
          } else {
          // Registration complete without OTP
          setModal({
            isOpen: true,
            type: 'success',
            title: 'Registration Successful!',
            message: 'Your account has been created successfully. You can now log in.'
          });
        }
      } else {
        // Handle validation errors
        if (response.errors) {
          const formattedErrors: { [key: string]: string } = {};
          Object.entries(response.errors).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              formattedErrors[key] = value[0]; // Take first error message
            } else {
              formattedErrors[key] = value;
            }
          });
          setErrors(formattedErrors);
        }
        setModal({
          isOpen: true,
          type: 'error',
          title: 'Registration Failed',
          message: response.message || 'Please check your information and try again.'
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Registration Failed',
        message: 'An unexpected error occurred. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (otp: string) => {
    setIsOtpLoading(true);
    
    try {
      const response = await authService.verifyOtp({
        email: formData.email,
        otp: otp
      });

      if (response.status === 'success') {
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Registration Complete!',
          message: 'Your email has been verified successfully. You can now log in.',
          showOtpInput: false
        });
      } else {
        setModal(prev => ({
          ...prev,
          type: 'error',
          title: 'Verification Failed',
          message: response.message || 'Invalid or expired verification code.'
        }));
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setModal(prev => ({
        ...prev,
        type: 'error',
        title: 'Verification Failed',
        message: 'Failed to verify code. Please try again.'
      }));
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsOtpLoading(true);
    
    try {
      const response = await authService.resendOtp(formData.email);
      
      if (response.status === 'success') {
        setModal(prev => ({
          ...prev,
          type: 'success',
          title: 'Code Sent',
          message: 'A new verification code has been sent to your email.'
        }));
        } else {
        setModal(prev => ({
          ...prev,
          type: 'error',
          title: 'Failed to Send',
          message: response.message || 'Failed to send verification code.'
        }));
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setModal(prev => ({
        ...prev,
        type: 'error',
        title: 'Failed to Send',
        message: 'Failed to send verification code. Please try again.'
      }));
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleModalClose = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
    
    // Redirect to login on successful registration
    if (modal.type === 'success' && (modal.title.includes('Registration Complete') || modal.title.includes('Registration Successful'))) {
      setTimeout(() => {
        router.push('/');
      }, 500);
    }
  };

    return (
    <div className="min-h-screen cosmic-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Navbar />
      
      <div className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-6 backdrop-blur-sm border border-white/10">
                <Image 
                  src="/logo.png" 
                  alt="MTI Logo" 
                width={48}
                height={48}
                className="object-contain"
                priority
                />
              </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500">META TRAVEL</span>
            </h1>
            <p className="text-xl text-gray-300">Create your account and start your journey</p>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            className="glass-effect rounded-3xl p-8 md:p-10 border border-white/10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Image */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="inline-block relative group">
                  <motion.div 
                    className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border-4 border-transparent group-hover:border-blue-500/50 overflow-hidden"
                    onClick={() => fileInputRef.current?.click()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Profile preview"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="text-center">
                        <CameraIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-gray-400 text-sm">Add Photo</span>
            </div>
          )}
                  </motion.div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer group-hover:bg-blue-600 transition-colors">
                    <CameraIcon className="w-5 h-5 text-white" />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                {errors.profile_image && (
                  <motion.p 
                    className="text-red-400 text-sm mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {errors.profile_image}
                  </motion.p>
                )}
                <p className="text-gray-500 text-sm mt-2">Profile photo (optional)</p>
              </motion.div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                      name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-4 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 ${
                        errors.full_name ? 'border-red-500' : 'border-gray-600'
                      }`}
                  placeholder="Enter your full name"
                      required
                />
              </div>
                  {errors.full_name && <p className="text-red-400 text-sm mt-2">{errors.full_name}</p>}
                </motion.div>

                {/* Username */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">Username *</label>
                <input
                  type="text"
                    name="username"
                  value={formData.username}
                  onChange={handleChange}
                    className={`w-full px-4 py-4 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 ${
                      errors.username ? 'border-red-500' : 'border-gray-600'
                    }`}
                  placeholder="Choose a username"
                    required
                  />
                  {errors.username && <p className="text-red-400 text-sm mt-2">{errors.username}</p>}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                <input
                  type="email"
                    name="email"
                  value={formData.email}
                  onChange={handleChange}
                    className={`w-full px-4 py-4 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="your@email.com"
                    required
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                </motion.div>

                {/* Phone Number */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                <input
                  type="tel"
                    name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                    className={`w-full px-4 py-4 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 ${
                      errors.phonenumber ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="+1234567890"
                    required
                  />
                  {errors.phonenumber && <p className="text-red-400 text-sm mt-2">{errors.phonenumber}</p>}
                </motion.div>

                {/* Address */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                    placeholder="Your address (optional)"
                  />
                </motion.div>

                {/* Date of Birth */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth *</label>
                <input
                  type="date"
                    name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                    className={`w-full px-4 py-4 bg-gray-800/50 border rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 ${
                      errors.date_of_birth ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.date_of_birth && <p className="text-red-400 text-sm mt-2">{errors.date_of_birth}</p>}
                </motion.div>
            </div>

              {/* Referral Code - Full Width */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">Referral Code</label>
                <input
                  type="text"
                  name="referral_id"
                  value={formData.referral_id}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  placeholder="Enter referral code (optional)"
                />
              </motion.div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                      className={`w-full px-4 py-4 pr-12 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 ${
                        errors.password ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                    </div>
                  {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password}</p>}
                  <PasswordStrength password={formData.password} />
                </motion.div>

                {/* Confirm Password */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password *</label>
                  <div className="relative">
                <input
                      type={showConfirmPassword ? 'text' : 'password'}
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                      className={`w-full px-4 py-4 pr-12 bg-gray-800/50 border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 ${
                        errors.password_confirmation ? 'border-red-500' : 'border-gray-600'
                      }`}
                  placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                    </div>
                  {errors.password_confirmation && <p className="text-red-400 text-sm mt-2">{errors.password_confirmation}</p>}
                </motion.div>
              </div>

              {/* Captcha */}
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600">
                  <Turnstile
                    sitekey={Environment.turnstileSiteKey}
                    onVerify={handleCaptchaVerify}
                    onError={handleCaptchaError}
                    onExpire={handleCaptchaExpire}
                    theme="dark"
                  />
                </div>
                {errors.captcha && <p className="text-red-400 text-sm mt-2 text-center">{errors.captcha}</p>}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                  type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </motion.button>

              {/* Login Link */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
              >
                <p className="text-gray-400">
              Already have an account?{' '}
                  <Link href="https://app.metatravel.ai" className="text-yellow-500 hover:text-yellow-400 transition-colors font-semibold">
                    Sign In
              </Link>
            </p>
              </motion.div>
            </form>
          </motion.div>
        </div>
          </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={handleModalClose}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        showOtpInput={modal.showOtpInput}
        onOtpSubmit={handleOtpSubmit}
        onResendOtp={handleResendOtp}
        isOtpLoading={isOtpLoading}
        email={modal.email}
      />
                  </div>
  );
}