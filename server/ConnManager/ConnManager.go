package ConnManager

import (
	"github.com/gorilla/websocket"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type ConnManager struct {
	conns   []*websocket.Conn
	msgType int
	msg     []byte
}

func NewConnManager() *ConnManager {
	return &ConnManager{}
}

func (c *ConnManager) Count() int {
	return len(c.conns)
}

func (c *ConnManager) AddConn(w http.ResponseWriter, r *http.Request) (*websocket.Conn, error) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return nil, err
	}
	c.conns = append(c.conns, conn)
	if c.msgType != 0 {
		if err = conn.WriteMessage(c.msgType, c.msg); err != nil {
			return nil, err
		}
	}
	return conn, nil
}

func (c *ConnManager) WriteMessageAll(msgType int, msg []byte) {
	c.msgType = msgType
	c.msg = msg

	var errs []int
	for i, conn := range c.conns {
		err := conn.WriteMessage(msgType, msg)
		if err != nil {
			errs = append(errs, i)
		}
	}
	for _, v := range errs {
		c.conns = append(c.conns[:v], c.conns[v+1:]...)
	}
}
