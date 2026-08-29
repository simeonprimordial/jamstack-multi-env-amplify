# Environment Promotion Rules

## Purpose

This project demonstrates controlled frontend delivery across Preview, Staging, and Production environments using GitHub and AWS Amplify Hosting.

The application is intentionally small. The primary engineering objective is environment promotion and frontend release management.

## Environment Model

| Environment | Git Reference | Purpose |
|---|---|---|
| Preview | Pull Request / feature branch | Validate proposed changes before integration |
| Staging | `staging` | Validate the release candidate |
| Production | `main` | Serve the approved production release |

## Promotion Flow

```text
Feature Branch
      |
      v
Pull Request
      |
      v
Preview Environment
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

## Preview Rules

- Feature work must be developed on a feature branch.
- A Pull Request targeting `main` creates an AWS Amplify Pull Request Preview.
- The preview environment is used to verify the proposed change without changing the staging or production deployment.

**Required validation:**

- [ ] Application loads successfully.
- [ ] Proposed change is visible.
- [ ] No unintended changes are observed.
- [ ] Build completes successfully.

## Staging Rules

- The `staging` branch represents the release candidate.
- Changes promoted to staging must be validated before they are promoted to production.

**Required validation:**

- [ ] Amplify build succeeds.
- [ ] Application loads successfully.
- [ ] Environment indicator shows `STAGING`.
- [ ] Intended functionality is present.
- [ ] No critical regression is observed.

## Production Rules

- The `main` branch represents production.
- Production changes are promoted through a Pull Request rather than by directly pushing feature work to `main`.

**Required validation:**

- [ ] Staging validation is complete.
- [ ] Promotion Pull Request has been reviewed.
- [ ] Production build succeeds.
- [ ] Application loads successfully.
- [ ] Environment indicator shows `PRODUCTION`.

## Environment Configuration

The application uses the same variable name across environments:

```
VITE_ENVIRONMENT
```

The base Amplify environment variable is:

```
VITE_ENVIRONMENT=STAGING
```

The `main` branch uses an Amplify variable override:

```
VITE_ENVIRONMENT=PRODUCTION
```

This allows the same application code to identify the environment in which it was built.

## Failure Handling

### Preview failure

If a Preview build fails:

1. Investigate the feature branch.
2. Correct the issue.
3. Push the correction to the same branch.
4. Revalidate the Preview.

### Staging failure

If Staging validation fails:

1. Do not promote the release to Production.
2. Correct the issue.
3. Push the correction.
4. Revalidate Staging.

### Production failure

If the Production deployment fails:

1. Investigate the Amplify deployment.
2. Do not consider the release complete until Production is healthy.
3. Use the available deployment and version controls to recover if necessary.

## Core Principle

A change should move toward Production only after it has been validated at the preceding stage.

```
Preview → Validate → Staging → Validate → Production
```

This separates development changes from the production release and provides a controlled promotion path.