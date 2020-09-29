document.addEventListener('DOMContentLoaded', () => {
    // Haga 'enter' para submitir mensage
    let msg=document.querySelector('#user_message');
    msg.addEventListener('Keyup', event => {
        event.preventDefault();
        if (eventKeyCode === 13) {
            document.querySelector('#send_message').click();
        }
    })
}
)