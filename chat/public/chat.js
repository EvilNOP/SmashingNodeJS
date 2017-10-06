window.onload = function () {
  const socket = io.connect('http://localhost:3000');
  
  socket.on('connect', () => {
    socket.emit('join', prompt('What is your nickname?'));
    
    document.getElementById('chat').style.display = 'block';
  });
  
  socket.on('announcement', (msg) => {
    const li = document.createElement('li');
    
    li.className = 'announcement';
    li.innerHTML = msg;
    
    document.getElementById('messages').appendChild(li);
  });
  
  const input = document.getElementById('input');
  
  document.getElementById('form').onsubmit = () => {
    addMessage('me', input.value);
    
    socket.emit('text', input.value);
    
    input.value = '';
    input.focus();
    
    return false;
  };
  
  socket.on('text', addMessage);
}

function addMessage(from, text) {
  const li = document.createElement('li');
  
  li.className = 'message';
  li.innerHTML = `<b>${from}</b>: ${text}`;
  
  document.getElementById('messages').appendChild(li);
}
