import './style.css'

const environment = import.meta.env.VITE_ENVIRONMENT || 'LOCAL'

document.querySelector('#app').innerHTML = `
  <header class="header">
    <div class="container nav">
      <div class="brand">CloudOps Hub</div>
      <span class="environment">${environment}</span>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <p class="eyebrow">AWS 80 PROJECTS · PROJECT 10</p>
        <h1>Multi-Environment Jamstack Delivery</h1>
        <p class="lead">
          A small documentation platform used to demonstrate
          preview, staging, production promotion and release management.
        </p>

        <div class="status">
          <span class="status-dot"></span>
          Deployed environment: <strong>${environment}</strong>
        </div>
      </div>
    </section>

    <section class="container docs">
      <article class="card">
        <h2>Architecture</h2>
        <p>
          Understand how the frontend moves through preview,
          staging and production environments.
        </p>
      </article>

      <article class="card">
        <h2>Deployment</h2>
        <p>
          Learn how GitHub branches connect to AWS Amplify
          deployment environments.
        </p>
      </article>

      <article class="card">
        <h2>Operations</h2>
        <p>
          Review validation, release controls and rollback
          procedures.
        </p>
      </article>

      <article class="card">
        <h2>Release Notes</h2>
        <p>
          Track changes as they move from development toward
          production.
        </p>
      </article>
    </section>
  </main>

  <footer>
    <div class="container">
      AWS 80 Projects · Multi-Environment Delivery Platform
    </div>
  </footer>
`