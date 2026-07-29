If a deployment fails:

Stop accepting new deployments.
Roll back to the previous stable Render deployment.
Verify /health endpoint.
Run automated tests.
Confirm MongoDB connectivity.
Monitor logs before reopening traffic.