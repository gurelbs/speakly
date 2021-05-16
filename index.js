require('dotenv').config();
const express = require('express');
const cmd = require('./router/cmd');
const app = express();
const cors = require('cors');
const { json } = require('express');
const path = require('path');
const http = require("http");
const server = http.createServer(app);
require('./mongoose')
const findOrCreateDoc = require('./utils/findOrCreateDocument')
const Document = require('./modules/Document')

const io  = require("socket.io")(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
})

app.use(cors())
app.use(express.json())
app.use(cmd)

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
}
let defaultData = ''
io.on("connection", socket => {
  console.log("New client connected");
  socket.on('get-document', async documentId => {
      const document = await findOrCreateDoc(documentId,defaultData)
      socket.join(documentId)
      socket.emit('load-document', document.data)
      socket.on("send-chenges", delta => {
          socket.broadcast.to(documentId).emit("receive-chenges",delta)
      })
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
      socket.on("save-document", async data => {
          await Document.findByIdAndUpdate(documentId,{ data })
      })
  })
});



server.listen(port, () => console.log(`Listening on http://localhost:${port}`));