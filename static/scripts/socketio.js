document.addEventListener('DOMContentLoaded', () => {
    var socket = io.connect('http://' + document.domain + ':' + location.port);
    let username = localStorage.getItem('nombre');
    let room = "canal 1";
    joinCanal("canal 1");
    // Despliega mensaje de entrada
    socket.on('message', data => {
        const p=document.createElement('p');
        const span_username=document.createElement('span');
        const span_timestamp=document.createElement('span');
        const br = document.createElement('br');
        if(data.username) {
            span_username.innerHTML=data.username;
            span_timestamp.innerHTML=data.time_stamp;
            p.innerHTML=span_username.outerHTML + br.outerHTML + data.msg +
            br.outerHTML + span_timestamp.outerHTML;
            document.querySelector('#display-message-section').append(p);
        } else {
            printSysMsg(data.msg);
        }
        });
    
    // Envía mensaje
        document.querySelector('#send_message').onclick = () => {
            socket.send({'msg': document.querySelector('#user_message').value, 'username': username, 'room': room});
        }
        // limpia area de entrada
        document.querySelector('#user_message').value='';

    // Selecciona canal
        document.querySelectorAll('.select-room').forEach(p => {
            p.onclick = () => {
                let newRoom = p.innerHTML;
                if (newRoom == room)  { 
                    msg = `ya esta en ${room} room`
                    printSysMsg(msg);
                } else {
                    leaveCanal(room);
                    joinCanal(newRoom);
                    room=newRoom;
                }     
            }
        });    

    // Leave canal
        function leaveCanal(room) {
            socket.emit('leave', {'username': username,'room': room});
        }

    // Join canal
        function joinCanal(room) {
            socket.emit('join', {'username': username, 'room': room});
        }

    // limpia area de mensaje
        document.querySelector('#display-message-section').innerHTML = ''

    // autofocus on text box
        document.querySelector('#user_message').focus();

    // imprime mensajes del sistema
        function printSysMsg(msg) {
            const p = document.createElement('p');
            p.innerHTML = msg;
            document.querySelector('#display-message-section').append(p);
        }

    })
    
                
