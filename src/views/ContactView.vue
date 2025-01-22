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
        <h2 class="section-title">Connect With Me</h2>
        <div class="social-links">
          <a
            v-for="(social, index) in socialLinks"
            :key="index"
            :href="social.url"
            target="_blank"
            class="social-link"
            :style="{ '--delay': `${index * 0.1}s` }"
          >
            <div class="social-link__icon">{{ social.icon }}</div>
            <div class="social-link__content">
              <h3 class="social-link__title">{{ social.title }}</h3>
              <p class="social-link__username">{{ social.username }}</p>
            </div>
          </a>
        </div>
      </section>

      <section class="contact-form">
        <h2 class="section-title">Send a Message</h2>
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
    username: "@yourusername",
    icon: "💻",
    url: "https://github.com/yourusername",
  },
  {
    title: "LinkedIn",
    username: "Your Name",
    icon: "👔",
    url: "https://linkedin.com/in/yourusername",
  },
  {
    title: "Twitter",
    username: "@yourusername",
    icon: "🐦",
    url: "https://twitter.com/yourusername",
  },
  {
    title: "Email",
    username: "your.email@example.com",
    icon: "📧",
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
    // Here you would typically make an API call to your backend
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

    // Show success message
    alert("Message sent successfully!");

    // Reset form
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
  // Hero animations
  gsap.from(".contact-hero__title", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
  });

  gsap.from(".contact-hero__subtitle", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power4.out",
  });

  // Social links animation
  gsap.from(".social-link", {
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
  });

  // Form animation
  gsap.from(".form", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: "power3.out",
  });
});
</script>

<style lang="scss" scoped>
.contact {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.contact-hero {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 4rem;

  &__title {
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  &__subtitle {
    font-size: 1.5rem;
    opacity: 0.8;
  }
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.section-title {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--card-color);
  border-radius: 15px;
  text-decoration: none;
  transition: all 0.3s ease;
  animation: slideIn 0.5s ease forwards;
  animation-delay: var(--delay);
  opacity: 0;

  &:hover {
    transform: translateX(10px);
    background: rgba(255, 255, 255, 0.1);
  }

  &__icon {
    font-size: 2rem;
  }

  &__content {
    flex: 1;
  }

  &__title {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }

  &__username {
    opacity: 0.8;
    font-size: 0.9rem;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  color: var(--primary-color);
  font-weight: 600;
}

.form-input {
  padding: 1rem;
  background: var(--card-color);
  border: 2px solid transparent;
  border-radius: 10px;
  color: var(--text-color);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    background: rgba(255, 255, 255, 0.1);
  }
}

.form-textarea {
  min-height: 150px;
  resize: vertical;
}

.submit-btn {
  padding: 1rem 2rem;
  background: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 255, 213, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .contact-hero {
    &__title {
      font-size: 3rem;
    }

    &__subtitle {
      font-size: 1.2rem;
    }
  }

  .contact-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
