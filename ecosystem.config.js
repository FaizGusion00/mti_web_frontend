module.exports = {
  apps: [
    {
      name: 'mti-web',
      script: 'npm',
      args: 'start',
      cwd: '/home/metatravel-register/htdocs/register.metatravel.ai/mti_web_frontend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '1G',
      restart_delay: 4000,
      watch: false,
      ignore_watch: ['node_modules', 'logs', '.git', '.next'],
    },
  ],
}; 