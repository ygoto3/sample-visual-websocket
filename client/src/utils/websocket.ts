const WS_URL = '/* @echo WS_URL */';

export function createWebSocket(onMessage: (e: MessageEvent) => void) {
  const ws = new WebSocket(`${WS_URL}/ws`);
  ws.addEventListener("message", onMessage);
  ws.addEventListener("close", (e: CloseEvent) => {
    console.log("closed");
  });
  return ws;
}
