# Multi-Environment Jamstack Delivery Platform

A small Jamstack application demonstrating controlled frontend delivery across **Preview, Staging, and Production** using GitHub and AWS Amplify Hosting.

### Engineering Objective

This project demonstrates:

- Pull Request preview deployments
- Independent staging and production environments
- GitHub branch-based delivery
- Environment-specific configuration
- Pull Request-based promotion
- Automatic AWS Amplify deployments
- Documented release management

---

## Architecture

```text
                         GitHub
                            |
              +-------------+-------------+
              |             |             |
          feature/*      staging         main
              |             |             |
              v             v             v
          Preview        Staging      Production
              |             |             |
              +-------------+-------------+
                            |
                       AWS Amplify
```

### Promotion Flow

```text
Feature Branch
      |
      v
Pull Request
      |
      v
Preview
      |
      | Validate
      v
Staging
      |
      | Promotion Pull Request
      v
main
      |
      v
Production
```

---

## Environments

| Environment | Git Reference | Purpose | Status |
|---|---|---|---|
| Preview | Pull Request / feature branch | Validate proposed changes | ✅ Working |
| Staging | `staging` | Validate release candidates | ✅ Working |
| Production | `main` | Serve approved releases | ✅ Working |

### Environment Configuration

The application uses:

```text
VITE_ENVIRONMENT
```

Amplify uses one base variable and a branch-specific override:

```text
Base:     VITE_ENVIRONMENT=STAGING
main:     VITE_ENVIRONMENT=PRODUCTION
```

This allows the same application source code to identify the environment in which it was built.

---

## Evidence

### Amplify Multi-Environment Configuration

The Amplify application is configured with separate branch deployments and environment-specific configuration.

![Amplify multi-environment configuration](screenshot/amplify%20multi%20env.png)

### Staging Environment

The `staging` branch deploys the application with the `STAGING` environment value.

![Staging environment](screenshot/staging%20env.png)

### Production Environment

The `main` branch deploys the application with the `PRODUCTION` environment value.

![Production environment](screenshot/production%20env.png)

### Pull Request Preview

A feature branch Pull Request produces an independent Amplify preview containing the proposed release change.

![Preview environment](screenshot/preview%20env.png)

The Amplify preview URL is also captured as deployment evidence:

![Amplify preview URL](screenshot/amplify%20web%20preview%20url.png)

---

## Application

The application is intentionally lightweight and acts as the validator workload for the delivery platform.

It provides a small documentation hub covering:

- Architecture
- Deployment
- Operations
- Release Notes

The primary engineering focus is the delivery architecture and release workflow rather than application complexity.

---

## Technology Stack

- AWS Amplify Hosting
- GitHub
- Vite
- JavaScript
- HTML
- CSS

---

## Release Workflow

### 1. Feature Development

Development begins on a feature branch:

```text
feature/*
```

Changes remain isolated from Staging and Production.

### 2. Preview

A Pull Request targeting `main` creates an AWS Amplify Pull Request Preview.

The preview is used to validate the proposed change before integration.

### 3. Staging

The `staging` branch represents the release candidate and is deployed independently by Amplify.

The release candidate is validated before production promotion.

### 4. Production Promotion

A Pull Request is used to promote the validated release into `main`.

After the merge, AWS Amplify automatically builds and deploys the new Production version.

---

## Validation Checklist

### Preview

- [x] Application loads successfully
- [x] Proposed release change is visible
- [x] Amplify preview build succeeds
- [x] Feature branch remains isolated from Staging and Production

### Staging

- [x] Amplify deployment succeeds
- [x] Application loads successfully
- [x] Environment indicator shows `STAGING`
- [x] Release candidate is validated

### Production

- [x] Promotion Pull Request is merged
- [x] Amplify automatically builds `main`
- [x] Application loads successfully
- [x] Environment indicator shows `PRODUCTION`

---

## Promotion Rules

Detailed release-management rules are documented in:

[`doc/promotion-rules.md`](doc/promotion-rules.md)

The core principle is:

```text
Preview → Validate → Staging → Validate → Production
```

A change should only move to the next environment after validation of the preceding environment.

---

## Project 09 vs Project 10

Project 09 demonstrated a straightforward frontend deployment workflow:

```text
GitHub → AWS Amplify → Production
```

Project 10 extends this into controlled multi-environment delivery:

```text
Feature → Preview → Staging → Production
```

The key improvement is **release isolation and controlled promotion**. Proposed changes can be previewed and validated before they reach Staging and Production.

---

## Project Outcome

Project 10 demonstrates a practical Git-based frontend release workflow with:

- Isolated feature development
- Pull Request previews
- Dedicated Staging deployment
- Dedicated Production deployment
- Branch-specific environment configuration
- Controlled Staging-to-Production promotion
- Automatic deployment after merge
- Documented promotion rules

**Status: Completed ✅**

**AWS 80 Projects Progress: 10 / 80**
