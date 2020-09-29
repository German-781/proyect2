import os

from flask import Flask, render_template, session, request, redirect, url_for
from flask_socketio import SocketIO, emit, send, join_room, leave_room
from time import localtime, strftime

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.secret_key = 'mi clave'
socketio = SocketIO(app)

ROOMS = ["canal 1", "canal 2", "canal 3", "canal 4"]

print(ROOMS)
print('German')


@app.route("/")
def index():
    
    return render_template("index.html")

@app.route("/chat", methods=['GET', 'POST'])
def chat():

    nombre=request.form.get("nombre")
    session['username'] = nombre

    canales=request.form.get("canales")
    print(canales)
    print("alfredo")

    return render_template("chat.html", username=nombre,rooms=ROOMS)

# Mensajes
@socketio.on('message')
def message(data):

    username = session['username']
    print('username')
    print(username)
    print(f"\n\n{data}\n\n")

    send({'msg': data['msg'], 'username': data['username'], 'time_stamp': strftime('%b-%d %I:%M%p',localtime())},
         room=data['room'])

@socketio.on('join')
def join(data):
    join_room(data['room'])
    username = session['username']
    print(username)

    send({'msg': data['username'] + " se unio a " + data['room']}, room=data['room'])

@socketio.on('leave')
def leave(data):
    leave_room(data['room'])
    username = session['username']

    send({'msg': data['username'] + " salio del " + data['room']}, room=data['room'])


@app.route("/canales")
def canales():

    return render_template("canales.html")

if __name__ == "__main__":
   socketio.run(app, debug=True)