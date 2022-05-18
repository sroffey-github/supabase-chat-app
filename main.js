const { createClient } = supabase;

const _supabase = createClient('https://jxniupinnckcgofoisxu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4bml1cGlubmNrY2dvZm9pc3h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI4NzMxNjQsImV4cCI6MTk2ODQ0OTE2NH0.A8uUl97zDSoNu2zT9CSOkA_fitMUZZklDGJ20BMYk2g');
const messagesElement = document.querySelector('#messages');

function addMessage(message) {
    const container = document.createElement('li');
    container.classList.add('container');

    container.innerHTML = `
    <img src="https://cdn.betterttv.net/emote/5590b223b344e2c42a9e28e3/3x" alt="Avatar" style="width:100%;">
    <p style="font-size: 12px; color: #555;">${DOMPurify.sanitize(message.username)}</p>
    <p>${DOMPurify.sanitize(message.content)}</p>
    <span class="time-right">${DOMPurify.sanitize(message.created_at)}</span>`

    messagesElement.append(container);
}

async function getMessages() {
    const { data: messages, error } = await _supabase
        .from('messages')
        .select('*');
    
    messages.forEach(addMessage);

    _supabase
        .from('messages')
        .on('INSERT', message => {
            addMessage(message.new);
        })
        .subscribe()
}

async function sendMessage() {
    let message = document.querySelector('#message');

    const { data, error } = await _supabase
        .from('messages')
        .insert([
            { username: 'test_user', content: DOMPurify.sanitize(message.value) }
        ])

    message.value = "";
}

document.querySelector('#submitBtn').addEventListener("click", sendMessage);

getMessages();