/**
* Environment configuration for the MTI web application
*/
export default class Environment {
    /**
    * Toggle this flag to switch between localhost and production server in development mode
    * - true: Use localhost:8000 for development
    * - false: Use panel.metatravel.ai (via proxy) for development
    */
    static useLocalServer: boolean = false;

    /**
    * Toggle to switch between cloud API and local API in development mode
    * - true: Use cloud API (panel.metatravel.ai via proxy)
    * - false: Use local API (localhost:8000)
    * This is the inverse of useLocalServer
    */
    static get useCloudApi(): boolean {
    return !this.useLocalServer;
  }
  static set useCloudApi(value: boolean) {
    this.useLocalServer = !value;
  }

  /**
   * Toggle to use production Turnstile keys vs test keys
   * - true: Use production keys (for production environment)
   * - false: Use test keys (for development/testing)
   *
   * IMPORTANT: For local development, set this to FALSE to avoid Cloudflare domain verification issues
   * Documentation: https://developers.cloudflare.com/turnstile/get-started/
   */
  static useTurnstileProductionKeys: boolean = true;

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
   * Get the API base URL based on the current environment
   */
  static get apiBaseUrl(): string {
    // If served from panel.metatravel.ai, use that directly
    if (typeof window !== 'undefined' && window.location.hostname === 'panel.metatravel.ai') {
      return 'https://panel.metatravel.ai';
    }

    // Honor explicit override via env var
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }

    // In development, choose localhost vs proxy
    if (this.isDevelopment) {
      return this.useLocalServer
        ? 'http://localhost:8000' // Direct to local backend
        : 'https://panel.metatravel.ai'; // Use direct URL instead of proxy
    }

    // In production, always target the real panel
    return 'https://panel.metatravel.ai';
  }

  /**
   * Get the web app URL based on the current environment
   */
  static get webAppUrl(): string {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return (
      process.env.NEXT_PUBLIC_WEB_URL ||
      (this.isDevelopment ? 'http://localhost:3000' : 'https://panel.metatravel.ai')
    );
  }

  /**
   * Get test OTP for development mode
   */
  static get testOtp(): string {
    return ''; // Always return empty string to allow user input
  }

  /**
   * Get Cloudflare Turnstile site key based on the environment
   *
   * Production key should only be used in production or when explicitly testing with production keys
   * Test key (1x00000000000000000000AA) always passes verification without domain validation
   */
  static get turnstileSiteKey(): string {
    if (this.isDevelopment && !this.useTurnstileProductionKeys) {
      console.log('[Turnstile] Using TEST key (development mode)');
      return '1x00000000000000000000AA';
    }
    console.log('[Turnstile] Using PRODUCTION key');
    return '0x4AAAAAABT-8FrRBkgeluJo';
  }

  /**
   * Alias for compatibility: Get Cloudflare Turnstile site key (for use as captchaSiteKey)
   */
  static get captchaSiteKey(): string {
    return this.turnstileSiteKey;
  }

  /**
   * Email configuration settings
   */
  static get emailConfig() {
    return {
      companyName: 'MetaTravel.ai',      // Company display name
      supportEmail: 'support@metatravel.ai',
      colors: {
        primary: '#FFD700',
        background: '#181818',
        text: '#FFFFFF',
        textSecondary: '#CCCCCC',
      },
      verification: {
        otpExpiryMinutes: 15,
        retryDelaySeconds: 60,
      },
    };
  }

  /**
   * API endpoint configuration
   */
  static get apiEndpoints() {
    return {
      auth: {
        register: '/api/v1/register',
        verifyOtp: '/api/v1/verify-otp',
        resendOtp: '/api/v1/resend-otp',
        backupRegistration: '/api/v1/backup-registration',
      },
    };
  }
}
