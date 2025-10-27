---
layout: home

hero:
  name: "BANCS"
  text: "Building Tomorrow's Solutions"
  tagline: Professional software development, AI integration, and technical consulting
  image:
    src: /bancs.png
    alt: BANCS Logo
  actions:
    - theme: brand
      text: View Projects
      link: /projects
    - theme: alt
      text: Read Blog
      link: /blog/
    - theme: alt
      text: Get in Touch
      link: /contact

features:
  - icon: 🚀
    title: Modern Development
    details: Building scalable applications with cutting-edge technologies including TypeScript, Vue, React, and Node.js
  - icon: 🤖
    title: AI Integration
    details: Leveraging Claude and other AI tools to enhance productivity and create intelligent solutions
  - icon: 💼
    title: Professional Consulting
    details: Expert guidance on architecture, best practices, and technology decisions for your projects
  - icon: 🛠️
    title: Open Source
    details: Contributing to the community and sharing knowledge through open-source projects and blog posts
  - icon: 📊
    title: Data-Driven
    details: Making informed decisions with analytics, testing, and continuous improvement
  - icon: 🎯
    title: Results Focused
    details: Delivering high-quality solutions that meet business objectives and user needs
---

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

## About BANCS

BANCS is a professional software development company focused on building modern, scalable solutions. We specialize in full-stack development, AI integration, and technical consulting.

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
  <InfoSection
    title="Our Approach"
    intro="We believe in:"
    :items="[
      '<strong>Quality over quantity</strong> - Building things right, not just fast',
      '<strong>Open collaboration</strong> - Sharing knowledge and learning together',
      '<strong>Modern tooling</strong> - Using the best tools for the job',
      '<strong>Continuous learning</strong> - Staying current with technology trends'
    ]"
  />

  <InfoSection
    title="What We Build"
    intro="We specialize in:"
    :items="[
      'Full-stack web applications',
      'AI-powered tools and integrations',
      'Developer tooling and automation',
      'Technical documentation and guides'
    ]"
  />
</div>

</div>

<GradientCTA
  heading="Ready to Work Together?"
  description="Whether you have a project in mind or just want to discuss technology, we'd love to hear from you."
  buttonHref="/contact"
  buttonAriaLabel="Navigate to contact page"
  buttonTitle="Visit our contact page to get in touch"
/>

