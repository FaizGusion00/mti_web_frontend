import axios from 'axios';
import Environment from '../../app/utils/environment';

export interface RegisterData {
  full_name: string;
  username: string;
  email: string;
  phonenumber: string;
  address?: string;
  date_of_birth: string;
  referral_id?: string;
  password: string;
  password_confirmation: string;
  profile_image?: File;
}

export interface OtpVerifyData {
  email: string;
  otp: string;
}

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  errors?: { [key: string]: string[] };
  user?: any;
  otp?: string;
}

class AuthService {
  private get apiUrl() {
    return `${Environment.apiBaseUrl}/api/v1`;
  }

  private getHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  }

  async checkOtpStatus(): Promise<{ otp_enabled: boolean }> {
    try {
      const response = await axios.get<ApiResponse<{ otp_enabled: boolean }>>(`${this.apiUrl}/otp-status`);
      return response.data.data || { otp_enabled: false };
    } catch (error) {
      console.error('Error checking OTP status:', error);
      return { otp_enabled: false }; // Default to disabled if check fails
    }
  }

  async register(data: RegisterData): Promise<ApiResponse> {
    const formData = new FormData();
    
    // Append all text fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && key !== 'profile_image') {
        formData.append(key, String(value));
      }
    });

    // Append profile image if exists
    if (data.profile_image) {
      formData.append('profile_image', data.profile_image);
    }

    try {
      const response = await axios.post<ApiResponse>(`${this.apiUrl}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiResponse;
      }
      return {
        status: 'error',
        message: 'Registration failed. Please try again.',
        errors: {}
      };
    }
  }

  async verifyOtp(data: OtpVerifyData): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(`${this.apiUrl}/verify-otp`, data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiResponse;
      }
      return {
        status: 'error',
        message: 'OTP verification failed. Please try again.'
      };
    }
  }

  async resendOtp(email: string): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(`${this.apiUrl}/resend-otp`, { email });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiResponse;
      }
      return {
        status: 'error',
        message: 'Failed to resend OTP. Please try again.'
      };
    }
  }

  async login(data: { email: string; password: string }): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(`${this.apiUrl}/login`, data);
      
      if (response.data.status === 'success' && response.data.data?.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiResponse;
      }
      return {
        status: 'error',
        message: 'Login failed. Please try again.'
      };
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }
}

export const authService = new AuthService(); 