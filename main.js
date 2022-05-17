
const { createClient } = supabase
const client = createClient(
    'https://jpjxtvstyvakfpsuwcoe.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwanh0dnN0eXZha2Zwc3V3Y29lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI4MTkyMjksImV4cCI6MTk2ODM5NTIyOX0.cFCpd2-HqXjO3eoLI5aDxlii9GLeJd99opsrwuj6o6Y'
);

const messagesElement = document.querySelector('#messages');

function addMessageToPage(message) {
    const element = document.createElement('li');
    element.classList.add('card', 'm-2');
    element.innerHTML = `
    <div class="card-body">
        <div class="row">
            <div class="column-sm-2 avatar-container">
                <img src="https://cdn.betterttv.net/emote/5590b223b344e2c42a9e28e3/3x" alt="Frog" class="mr-3">
                <p class="avatar-username">${message.username}</p>
            </div>
            <div class="col-sm-10">
                <p>${message.content}</p>
            </div>
        </div>
        <div class="row">
            <p class="col-sm-12 timestamp">${message.created_at}</p>
        </div>
    </div>`
    messagesElement.append(element);
}

async function init() {
    const { data: messages } = await client
    .from('Messages')
    .select('*')

    messages.forEach(addMessageToPage);

    client
    .from('Messages')
    .on('INSERT', (message) => {
        addMessageToPage(message.new);
        console.log('Message Received!', message);
    })
}

init();