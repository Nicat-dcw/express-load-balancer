
const http = require('http');
const servers = [
  {host: 'server1', port: 8080},
  {host: 'server2', port: 8080},
  {host: 'server3', port: 8080}
];

const server = http.createServer((req, res) => {
  const selectedServer = servers[Math.floor(Math.random() * servers.length)];
  const options = {
    hostname: selectedServer.host,
    port: selectedServer.port,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxy = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  req.pipe(proxy);
});

server.listen(3000);
