<template>
  <footer class="legal-footer">
    <div class="footer-content">
      <div class="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <span class="separator">·</span>
        <a href="/terms">Terms of Use</a>
      </div>
      <div class="company-info">
        <a href="/about">BANCS AS</a> · Org.nr: 927 177 579 · Allegaten 6, 4400 Flekkefjord ·
        <a href="mailto:contact@bancs.no">contact@bancs.no</a>
      </div>
      <div class="attribution">
        Built with VitePress and Tailwind CSS · <a href="https://github.com/BANCS-Norway/home/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">{{ version }}</a> · Developed with Claude by Anthropic
      </div>
      <div class="copyright">
        Copyright © {{ new Date().getFullYear() }} BANCS AS
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { version } from '../../../../package.json'
</script>

<style scoped>
.legal-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding: 1rem 0;
  margin-top: 2rem;
}

.footer-content {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.footer-links {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: var(--vp-c-brand);
  text-decoration: underline;
}

.footer-links a:hover {
  text-decoration: none;
}

.footer-links .separator {
  margin: 0 0.5rem;
}

.company-info {
  margin-bottom: 0.5rem;
}

.company-info a {
  color: var(--vp-c-brand);
  text-decoration: underline;
}

.company-info a:hover {
  text-decoration: none;
}

.attribution {
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.attribution a {
  color: var(--vp-c-brand);
  text-decoration: underline;
}

.attribution a:hover {
  text-decoration: none;
}

.copyright {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .company-info {
    display: block;
    line-height: 1.6;
  }

  .footer-links {
    margin-bottom: 0.75rem;
  }
}
</style>
