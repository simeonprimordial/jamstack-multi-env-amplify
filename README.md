# Multi-Environment Jamstack Delivery Platform

A small Jamstack application demonstrating controlled frontend delivery across Preview, Staging, and Production using GitHub and AWS Amplify Hosting.

### Engineering Objective

Demonstrate:

- Preview deployments
- Staging environments
- Production environments
- GitHub branch-based delivery
- Environment-specific configuration
- Pull request promotion
- Automated AWS Amplify deployments
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

### Environments

| Environment | Git Reference | Purpose |
|---|---|---|
| Preview | Pull Request / feature branch | Validate proposed changes |
| Staging | `staging` | Validate release candidates |
| Production | `main` | Serve approved releases |

---

## Application

The application is intentionally lightweight.

It provides a small documentation hub covering:

- Architecture
- Deployment
- Operations
- Release Notes

The application is a validator workload. The primary focus of this project is the delivery architecture and release workflow.

### Technology Stack

- AWS Amplify Hosting
- GitHub
- Vite
- JavaScript
- HTML
- CSS

---

## Environment Configuration

The application uses the following environment variable:

```
VITE_ENVIRONMENT
```

AWS Amplify uses a base environment variable with a branch-specific override.

**Staging**

```
VITE_ENVIRONMENT=STAGING
```

**Production**

```
VITE_ENVIRONMENT=PRODUCTION
```

This allows the same application source code to identify the environment in which it was built.

---

## Release Workflow

### 1. Feature Development

Development begins on a feature branch.

```
feature/*
```

Changes remain isolated from Staging and Production.

### 2. Preview

A Pull Request targeting `main` creates an AWS Amplify Pull Request Preview.

The preview is used to validate the proposed change before production integration.

### 3. Staging

Validated changes are deployed through the `staging` branch.

The Staging environment must be validated before production promotion.

### 4. Production Promotion

A Pull Request is used to promote a validated release into `main`.

Once merged, AWS Amplify automatically builds and deploys the new Production version.

---

## Validation

### Preview

- [ ] Application loads successfully
- [ ] Proposed change is visible
- [ ] Build succeeds
- [ ] No unintended changes are observed

### Staging

- [ ] Amplify deployment succeeds
- [ ] Application loads successfully
- [ ] Environment indicator shows `STAGING`
- [ ] Release candidate is validated

### Production

- [ ] Promotion Pull Request is merged
- [ ] Amplify automatically builds `main`
- [ ] Application loads successfully
- [ ] Environment indicator shows `PRODUCTION`

---

## Evidence

The project demonstrates:

- GitHub repository connected to AWS Amplify
- `staging` branch deployed independently
- `main` branch deployed independently
- Branch-specific Amplify environment variable override
- Pull Request Preview deployment
- Feature branch isolation
- Staging-to-Production promotion
- Automatic Production deployment after merge
- Environment-specific application identification
- Documented promotion rules

---

## Promotion Rules

Detailed release-management rules are documented in:

```
docs/promotion-rules.md
```

The core principle is:

```
Preview → Validate → Staging → Validate → Production
```

A change should only move to the next environment after validation of the preceding environment.

---

## Project Outcome

This project demonstrates the transition from simple frontend CI/CD to controlled multi-environment frontend delivery.

Project 09 demonstrated:

```
GitHub → Amplify → Production
```

Project 10 extends that model to:

```
Feature → Preview → Staging → Production
```

The result is a controlled release workflow where proposed changes can be validated before reaching production.