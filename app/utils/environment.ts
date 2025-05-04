/**
 * Environment configuration for the MTI web application
 */
class Environment {
  /**
   * Determine if the app is running in production mode
   */
  static get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  /**
   * Determine if the app is running in development mode
   */
  static get isDevelopment(): boolean {
    return !this.isProduction;
  }

  /**
   * Flag to use cloud API instead of local development server
   * This can be toggled during development to switch between local and cloud environments
   */
  static useCloudApi: boolean = true;

  /**
   * Get the API base URL based on the current environment
   */
  static get apiBaseUrl(): string {
    // Environment variable takes highest precedence
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }
    
    // If in production, always use production API
    if (this.isProduction) {
      return 'https://panel.metatravel.ai';
    }
    
    // If in development but cloud API is enabled, use CloudPanel
    if (this.useCloudApi) {
      return 'https://panel.metatravel.ai';
    }
    
    // Otherwise use local development server
    return 'http://localhost:8000';
  }

  /**
   * Get the web app URL based on the current environment
   */
  static get webAppUrl(): string {
    // Environment variable takes highest precedence
    if (process.env.NEXT_PUBLIC_WEB_URL) {
      return process.env.NEXT_PUBLIC_WEB_URL;
    }
    
    // If in production, use production URL
    if (this.isProduction) {
      return 'https://metatravel.ai';
    }
    
    // Otherwise use local development URL
    return 'http://localhost:3000';
  }

  /**
   * Get test OTP for development mode
   */
  static get testOtp(): string {
    return this.isDevelopment ? '123456' : '';
  }
  
  /**
   * Get database configuration
   */
  static get dbConfig(): Record<string, any> {
    if (this.isProduction || this.useCloudApi) {
      // CloudPanel MySQL credentials
      return {
        host: 'panel.metatravel.ai',
        database: 'metatravelpanel',
        username: 'metatravelpanel',
        password: '8NoilDq9CC95VMfPd8ca',
        port: 3306
      };
    } else {
      // Local development database credentials
      return {
        host: 'localhost',
        database: 'mti_db',
        username: 'root',
        password: '',
        port: 3306
      };
    }
  }
}

export default Environment;