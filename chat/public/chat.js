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
    
    document.getElementById('message').appendChild(li);
  });
}
