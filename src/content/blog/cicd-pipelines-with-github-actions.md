# CI/CD Pipelines with GitHub Actions

GitHub Actions brings CI/CD directly into your repository. Every push, pull request, or release can trigger automated build, test, and deploy workflows.

## A Basic Vue + Vite Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx tsc --noEmit

      - name: Build
        run: npm run build

      - name: Run tests
        run: npm run test
```

## Deploy to GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Environment Secrets

Store sensitive values (API keys, tokens) as GitHub Secrets and reference them in workflows:

```yaml
- name: Deploy to production
  env:
    API_KEY: ${{ secrets.PRODUCTION_API_KEY }}
  run: npm run deploy
```

## Matrix Builds

Test across multiple Node.js versions in parallel:

```yaml
strategy:
  matrix:
    node-version: ['18', '20', '22']
steps:
  - uses: actions/setup-node@v4
    with:
      node-version: ${{ matrix.node-version }}
```

## Summary

GitHub Actions makes CI/CD accessible without a separate service. Start with a simple build-and-test workflow, then add deployment steps once the pipeline is stable.
