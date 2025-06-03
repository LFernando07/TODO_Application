import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:5173', // Vite default
  'http://localhost:8080', // Vue CLI default
  'http://localhost:3000', // default
  'http://localhost:1234', // Personal dev server
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
})