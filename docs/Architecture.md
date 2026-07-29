Page Pulse Architecture
Overview

Page Pulse is a production-ready full-stack web application that audits websites for SEO and metadata quality. The application is designed to support approximately 10,000 audits per day while handling bursts of 500 concurrent requests.

The system uses a React frontend, Express.js backend, MongoDB for persistence, Redis (or in-memory cache) for caching, and Render for deployment.

System Components
Frontend
React + Vite
Material UI
Displays audit reports
Sends API requests to backend
Backend API
Node.js
Express.js
Input validation
Rate limiting
Structured logging
Request IDs
Global error handling
Cache Layer
Redis
Stores recent audit results
Configurable cache expiration
Reduces duplicate external requests
Database
MongoDB Atlas

Stores:

Audit history
Metadata
Audit timestamps
External Website

The backend fetches the requested website using Axios.

The HTML is parsed using Cheerio.

Data Flow
User
   │
   ▼
React Frontend
   │
HTTPS
   ▼
Express API
   │
Validate URL
   │
Check Cache
   │
 ┌──────────────┐
 │ Cache Hit?   │
 └─────┬────────┘
       │Yes
       ▼
Return Cached Result
       │
       └──────────────► User

No
│
▼
Fetch Website (Axios)
│
▼
Parse HTML (Cheerio)
│
▼
Generate Audit Report
│
▼
Store in MongoDB
│
▼
Update Cache
│
▼
Return Response

                 ┌──────────────────────┐
                 │      React Frontend  │
                 │      (Vite + MUI)    │
                 └──────────┬───────────┘
                            │ HTTPS
                            ▼
               ┌─────────────────────────┐
               │     Express Backend     │
               │ Input Validation        │
               │ Rate Limiter            │
               │ Logging                 │
               │ Request IDs             │
               └──────────┬──────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐    ┌────────────┐   ┌────────────┐
    │ Redis    │    │ MongoDB    │   │ Axios      │
    │ Cache    │    │ Atlas      │   │ + Cheerio  │
    └──────────┘    └────────────┘   └─────┬──────┘
                                           │
                                           ▼
                                  Target Website