package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/ygoto3/sample-visual-websocket/server/ConnManager"
	"log"
	"net/http"
	"time"
)

var connManager = ConnManager.NewConnManager()

func echoHandler(w http.ResponseWriter, r *http.Request) {
	var conn *websocket.Conn
	var err error
	if conn, err = connManager.AddConn(w, r); err != nil {
		log.Fatal(err)
	}

	for {
		msgType, msg, err := conn.ReadMessage()
		if err != nil {
			return
		}
		time.Sleep(300 * time.Millisecond)
		connManager.WriteMessageAll(msgType, []byte(msg))
	}
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("sample-visual-websocket"))
	})
	http.HandleFunc("/ws", echoHandler)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
	fmt.Println("Listening to :8080")
}
