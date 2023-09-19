<template>
  <v-container fluid class="background">
    <v-card flat class="overflow-y-auto" color="#2e2e2e" max-height="800" min-height="400">
      <div class="chatbot-container">
        <div class="chat-display">
          <div v-for=" message  in  messages " :key="message.id">
            <v-row no-gutters justify="center">
              <v-col cols="6">
                <span v-if="message.who === 'You'">
                  <v-card color="#2e2e2e" flat class="ma-2 pa-2 w-auto" dense>
                    <p class="text-right">{{ message.text }}</p>
                  </v-card>
                </span>
                <span v-else>
                  <v-card color="#2e2e2e" flat class="ma-2 pa-2" dense>
                    <p class="text-left">{{ message.text }}</p>
                  </v-card>
                </span>
              </v-col>
            </v-row>
          </div>
        </div>
        <div class="input-area">
          <textarea v-model="userInput" placeholder="Ask a question..."></textarea>
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </v-card>

  </v-container>
</template>

<script lang="ts" setup>
interface RequestBody {
  systemContext: string;
  text: string;
  who: string;
}

interface Message {
  id: number;
  who: string;
  text: string;
}

interface BotResponse {
  id: number;
  text: string;
}
import { ref, reactive, computed, onMounted } from 'vue';

let userInput = ref('');
let messages: Message[] = reactive([]);

const isGpt = ref(true);

let newChat = ref(true);
let showBot = ref(false);
let responses: BotResponse[] = reactive([]);

onMounted(() => {
  messages.push({
    id: Date.now(),
    text: 'Hello! How can I assist you today?',
    who: 'GPT'
  })
})

let message: RequestBody = {
  systemContext: 'You are a helpful assistent',
  text: '',
  who: ''
}

const displayMessage = (who: string, text: string) => {
  messages.push({
    id: 0,
    who,
    text
  })
}

const toggleBot = () => {
  showBot.value = true;
  newChat.value = false;
}

const sendMessage = async () => {
  if (userInput.value.trim()) {
    messages.push({ id: Date.now(), text: userInput.value, who: 'You' });
    message.text = userInput.value;
    userInput.value = '';
    const request = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    const response = await request.json();
    messages.push({
      id: 0,
      text: response.text,
      who: 'GPT'
    });
  }
};
</script>
<style scoped>
.background {
  background-image: url("background.png");
  height: 100vh;
}

.chatbot-container {
  width: auto;
  height: 800px;
  min-height: 400px;
  border: 1px solid #333;
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-display {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-area {
  display: flex;
  gap: 8px;
}

textarea {
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #333;
  background-color: #2e2e2e;
  color: #fff;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4e4e4e;
  color: #fff;
  cursor: pointer;
}

.user {
  align-self: flex-end;
  background-color: #4e4e4e;
  padding: 8px;
  border-radius: 8px;
  max-width: 70%;
}

.bot {
  align-self: flex-start;
  background-color: #2e2e2e;
  padding: 8px;
  border-radius: 8px;
  max-width: 70%;
}
</style>