<template>
  <div class="contact">
    <section class="contact-hero">
      <h1 class="contact-hero__title">Get in Touch</h1>
      <p class="contact-hero__subtitle">
        Let's collaborate on your next project
      </p>
    </section>

    <div class="contact-container">
      <section class="contact-info">
        <h3 class="contact-info__heading">Connect With Me</h3>
        <div class="social-links">
          <a
            v-for="(social, index) in socialLinks"
            :key="index"
            :href="social.url"
            target="_blank"
            class="social-link"
            :style="{ '--i': index }"
          >
            <span class="social-link__icon" v-html="social.svg"></span>
            <div class="social-link__content">
              <span class="social-link__title">{{ social.title }}</span>
              <span class="social-link__username">{{ social.username }}</span>
            </div>
          </a>
        </div>
      </section>

      <section class="contact-form">
        <h3 class="contact-form__heading">Send a Message</h3>
        <form @submit.prevent="handleSubmit" class="form">
          <div class="form-group">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              id="name"
              v-model="formData.name"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="subject" class="form-label">Subject</label>
            <input
              type="text"
              id="subject"
              v-model="formData.subject"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Message</label>
            <textarea
              id="message"
              v-model="formData.message"
              class="form-input form-textarea"
              required
            ></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? "Sending..." : "Send Message" }}
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";

const socialLinks = [
  {
    title: "GitHub",
    username: "@RitaYang0811",
    svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
    url: "https://github.com/RitaYang0811",
  },
  {
    title: "LinkedIn",
    username: "Rita Yang",
    svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    url: "https://linkedin.com/in/yourusername",
  },
  {
    title: "Email",
    username: "your.email@example.com",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>',
    url: "mailto:your.email@example.com",
  },
];

const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Message sent successfully!");

    formData.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  } catch (error) {
    alert("Failed to send message. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  gsap.from(".contact-hero__title", {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: "power4.out",
  });
  gsap.from(".contact-hero__subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.15,
    ease: "power4.out",
  });
});
</script>

<style lang="scss" scoped>
.contact {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

// ── Hero ──
.contact-hero {
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 3rem;

  &__title {
    font-size: 3rem;
    font-weight: 300;
    color: var(--text-color);
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  &__subtitle {
    font-size: 1rem;
    opacity: 0.45;
  }
}

// ── Container ──
.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

// ── Section headings ──
.contact-info__heading,
.contact-form__heading {
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.4;
  margin-bottom: 1.25rem;
}

// ── Social links ──
.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1rem;
  background: var(--glass-bg, rgba(255, 255, 255, 0.03));
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
  border-radius: 10px;
  text-decoration: none;
  color: var(--text-color);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;

  // CSS staggered entrance
  animation: linkIn 0.4s ease both;
  animation-delay: calc(var(--i, 0) * 0.08s);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary-color);

    .social-link__icon {
      color: var(--primary-color);
    }
  }

  &__icon {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    transition: color 0.3s ease;

    :deep(svg) {
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }

  &__title {
    font-size: 0.85rem;
    font-weight: 600;
    line-height: 1.3;
  }

  &__username {
    font-size: 0.75rem;
    opacity: 0.45;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@keyframes linkIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// ── Form ──
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-label {
  font-size: 0.72rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.45;
}

.form-input {
  padding: 0.7rem 0.85rem;
  background: var(--glass-bg, rgba(255, 255, 255, 0.03));
  border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
  border-radius: 8px;
  color: var(--text-color);
  font-size: 0.85rem;
  font-family: inherit;
  transition:
    border-color 0.3s ease,
    background 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-btn {
  align-self: flex-start;
  padding: 0.6rem 1.6rem;
  background: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(232, 88, 76, 0.25);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

// ── Responsive ──
@media (max-width: 768px) {
  .contact-hero__title {
    font-size: 2.2rem;
  }

  .contact-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>
