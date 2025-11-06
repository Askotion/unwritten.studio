/**
 * Echo Chatbot - Alpine.js Component
 * Poetischer Transformator für Unwritten Studio
 */

function echoChat() {
  return {
    messages: [],
    userInput: '',
    isTyping: false,
    profile: null,
    messageIdCounter: 1,
    API_URL: 'https://echo-api.post-666.workers.dev',

    /**
     * Initialize chat with random opening message
     */
    init() {
      const openings = [
        'Ich bin Echo.\nWorte, die zurückkommen - verwandelt.\n\nWas hat dich hergeführt?',
        'Ich bin Echo.\nDer Raum zwischen deinen Worten und ihrer Bedeutung.\n\nWas suchst du?',
        'Ich bin Echo.\nIn jedem Anfang liegt ein Zauber. Auch in diesem.\n\nErzähl mir.'
      ];

      const randomOpening = openings[Math.floor(Math.random() * openings.length)];

      this.messages = [
        {
          id: this.messageIdCounter++,
          role: 'echo',
          content: randomOpening
        }
      ];

      // Focus input after modal opens
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.focus();
        }
      });
    },

    /**
     * Render markdown safely with DOMPurify
     */
    renderMarkdown(text) {
      if (!text) return '';

      // Use marked.js to parse markdown
      const html = marked.parse(text, {
        breaks: true,
        gfm: true
      });

      // Sanitize HTML with DOMPurify
      return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'strong', 'em', 'code', 'p', 'ul', 'ol', 'li',
          'a', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'hr', 'br'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel']
      });
    },

    /**
     * Send user message to API
     */
    async sendMessage() {
      // Validation
      if (!this.userInput.trim() || this.isTyping) {
        return;
      }

      const userMessage = this.userInput.trim();

      // Add user message to chat
      this.messages.push({
        id: this.messageIdCounter++,
        role: 'user',
        content: userMessage
      });

      // Clear input and scroll
      this.userInput = '';
      this.scrollToBottom();
      this.isTyping = true;

      try {
        // Call API
        const response = await fetch(this.API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: this.messages,
            profile: this.profile
          })
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Stop typing indicator
        this.isTyping = false;

        // Add Echo's response
        this.messages.push({
          id: this.messageIdCounter++,
          role: 'echo',
          content: data.message
        });

        // Update profile if returned
        if (data.profile) {
          this.profile = data.profile;
        }

        this.scrollToBottom();

      } catch (error) {
        console.error('Chat error:', error);
        this.isTyping = false;

        // Show error message
        this.messages.push({
          id: this.messageIdCounter++,
          role: 'echo',
          content: 'Echo ist gerade in Gedanken versunken. Versuch es gleich nochmal.'
        });

        this.scrollToBottom();
      }
    },

    /**
     * Scroll to bottom of messages
     */
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.messages) {
          this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
        }
      });
    },

    /**
     * Close modal
     */
    closeModal() {
      const modal = document.getElementById('echo-modal');
      if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
      }
    }
  };
}

// Make function globally available for Alpine.js
window.echoChat = echoChat;
