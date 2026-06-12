# PR Shield — Self-Hosting Guide (Enterprise)

## Quick Start (Docker Compose)

### 1. Clone and configure

```bash
git clone https://github.com/ertaneker/pr-guardian.git
cd pr-guardian
cp .env.production.example .env
# Edit .env with your API keys and secrets
```

### 2. Start

```bash
docker compose up -d
```

### 3. Verify

```bash
curl http://localhost:3001/api/v1/health
# {"status":"ok","version":"0.1.0"}
```

## Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 2 cores | 4 cores |
| RAM | 2 GB | 4 GB |
| Disk | 10 GB | 20 GB SSD |
| Docker | 24.0+ | Latest |
| Docker Compose | 2.0+ | Latest |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| DEEPSEEK_API_KEY | Yes | DeepSeek API key for AI analysis |
| GITHUB_TOKEN | Yes | GitHub PAT for PR access |
| JWT_SECRET | Yes | Random string for JWT signing |
| DB_PASSWORD | Yes | PostgreSQL password |
| STRIPE_SECRET_KEY | No | For paid plans |
| APP_URL | No | Frontend URL for CORS |

## Kubernetes (Helm coming soon)

See `k8s/` directory for bare Kubernetes manifests.

## Security Notes

- Change all default passwords
- Use a reverse proxy (nginx/Caddy) with HTTPS in front
- Rotate JWT_SECRET regularly
- Enable firewall, allow only ports 80/443
- Regular backups of PostgreSQL volume

## Support

Enterprise plans include dedicated support.
Contact: ertaneker@gmail.com
