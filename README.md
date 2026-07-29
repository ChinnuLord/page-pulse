## API Contract

### Base URL

```
https://page-pulse-backend-7q5d.onrender.com
```
## Live Demo

Frontend:
https://page-pulse-topaz-kappa.vercel.app

Backend:
https://page-pulse-backend-7q5d.onrender.com
---

### Health Check

**GET**

```
/health
```

Response

```json
{
  "success": true,
  "message": "Server is healthy"
}
```

---

### Audit Website

### Headers

```
Content-Type: application/json
```

**POST**

```
/api/audit
```

Request Body

```json
{
  "url": "https://openai.com"
}
```

Successful Response

```json
{
  "success": true,
  "data": {
    "title": "...",
    "description": "...",
    "headings": [...],
    "images": 12,
    "links": 48
  }
}
```

Error Response

```json
{
  "success": false,
  "message": "Invalid URL"
}
```

---

### Audit History

**GET**

```
/api/history
```

Returns previously completed audits.

---

## Environment Variables

```
MONGO_URI=
CACHE_TTL=3600
NODE_ENV=production
REDIS_URL=
```
### Status Codes

| Status | Description |
|--------|-------------|
| 200 | Request successful |
| 400 | Invalid URL |
| 404 | Route not found |
| 429 | Rate limit exceeded |
| 500 | Internal server error |
```

## Caching

Repeated requests for the same URL within the configured cache window are served from cache to reduce latency and external requests.

Cache duration is controlled by:

```
CACHE_TTL
```

## Rate Limiting

The API applies per-client rate limiting to prevent abuse.

If the limit is exceeded, the API returns:

```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```

## Testing

Run tests:

```bash
npm test
```

Continuous Integration is configured using GitHub Actions and runs automatically on every push.