<script>
    // BtnGitHubLogin.svelte
    // Simple informational section describing how the GitHub login works and privacy guarantees.
    export let className = '';
</script>

<section class="card {className}" aria-labelledby="how-it-works-title">
    <h2 id="how-it-works-title">How it Works</h2>

    <p>
        Our application allows you to log in with your GitHub account to visualize your profile information and statistics in a unique and engaging way.
        When you connect, our app can access your public and private data (with your permission) to fetch details like:
    </p>

    <ul class="features" aria-label="github-data-examples">
        <li>Most used programming languages</li>
        <li>Repository sizes</li>
        <li>Commit history</li>
        <li>Contribution graphs</li>
        <li>and more!</li>
    </ul>

    <p class="note">
        We only display this information to you in a fashionable manner to help you understand your GitHub profile at a glance.
    </p>

    <h3 class="privacy-title">Your Data and Privacy <span aria-hidden="true">🛡️</span></h3>

    <p>We take your privacy seriously. Here's what you need to know about your data:</p>

    <ul class="privacy-list" aria-label="privacy-points">
        <li>
            <strong>No Storage:</strong>
            We do not store your GitHub data in our database. All the information you see is fetched in real-time when you are logged in.
        </li>
        <li>
            <strong>Temporary Access:</strong>
            Your data is only available for the duration of your session. Once you log out or close the app, the fetched information is discarded.
        </li>
        <li>
            <strong>Limited Permissions:</strong>
            We only request the minimum necessary permissions to provide you with the app's features. We cannot modify, delete, or create any of your GitHub data.
        </li>
        <li>
            <strong>Public Data:</strong>
            Even without logging in, you can still use our app to view publicly available GitHub data for any user.
        </li>
    </ul>
</section>

<style>
    :global(:root) {
        --card-bg: #ffffff;
        --card-border: #e6e9ef;
        --muted: #6b7280;
        --accent: #24292f;
        --radius: 10px;
        --shadow: 0 6px 20px rgba(36,41,47,0.06);
    }

    .card {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: var(--radius);
        padding: 1.25rem 1.5rem;
        box-shadow: var(--shadow);
        max-width: 720px;
        color: var(--accent);
        line-height: 1.5;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    }

    h2 {
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
    }

    h3.privacy-title {
        margin-top: 1.25rem;
        font-size: 1rem;
    }

    p {
        margin: 0 0 0.75rem 0;
        color: var(--muted);
        font-size: 0.95rem;
    }

    .features,
    .privacy-list {
        margin: 0 0 0.75rem 1rem;
        padding: 0;
        color: var(--muted);
        font-size: 0.95rem;
    }

    .features li,
    .privacy-list li {
        margin: 0.45rem 0;
    }

    .note {
        margin-top: 0.35rem;
        font-weight: 500;
        color: #111827;
    }

    @media (max-width: 520px) {
        .card {
            padding: 1rem;
            border-radius: 8px;
        }
    }
</style>