const http = require("http");
const fs = require("fs");
const crypto = require('crypto');

const url = "https://framer.loophole.site/"
const img_url = "https://i.imgur.com/oLhw7FR.gif";
const rimg = "https://source.unsplash.com/random/1000x523"; //random image
var uid = "";
var addr = "0x";
var obj = { "0x": { bg: img_url } };
var obf = {};
const sc = "<script src='https://cdn.jsdelivr.net/gh/alekcangp/framer@adbf05c301252433fe6b6dc9bbde3f2d737fcaa1/relaxing.js'></script>";
const co = '"Content-Type": "text/html","Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept","Access-Control-Allow-Methods": "POST, GET, OPTIONS"';

fs.access("storage.txt", fs.F_OK, (err) => {
  if (err) {
    fs.writeFileSync("storage.txt", "{}");
    return;
  }
  let data = fs.readFileSync("storage.txt", { encoding: "utf8", flag: "r" });
  obf = JSON.parse(data);
});


const server = http.createServer(async (req, res) => {

  //Start frame
  if (req.url === "/") {
    res.writeHead(200, { co });
    const frame = constructor( img_url, "", "Start", "post", "bg", "", "", "", "", "", "", "", "", "", sc,url );
    res.end(frame);

  // bg url
  } else if (req.url === "/bg") {
    res.writeHead(200, { co });
    const frame = constructor( img_url, "Enter image's or empty for random", "Back", "post", "", "Continue", "post", "l1", "", "", "", "", "", "", "",url );
    res.end(frame);

  // label 1
  } else if (req.url === "/l1") {
    await parseReq(req, "bg");
    res.writeHead(200, { co });
    const frame = constructor( obj[addr].bg, "Enter button's label 1", "Back", "post", "bg", "Continue", "post", "t1", "", "", "", "", "", "", "",url );
    res.end(frame);

  // target 1
  } else if (req.url === "/t1") {
    await parseReq(req, "l1");
    res.writeHead(200, { co });
    const frame = constructor( obj[addr].bg, "Enter button's URL link 1", "Back", "post", "l1", "Continue", "post", "l2", "", "", "", "", "", "", "",url );
    res.end(frame);

  // label 2
  } else if (req.url === "/l2") {
    await parseReq(req, "t1");
    res.writeHead(200, { co });
    const frame = constructor( obj[addr].bg, "Enter button's label 2", "Back", "post", "t1", "Continue", "post", "t2", "", "", "", "", "", "", "",url );
    res.end(frame);

  // target 2
  } else if (req.url === "/t2") {
    await parseReq(req, "l2");
    res.writeHead(200, { co });
    const frame = constructor( obj[addr].bg, "Enter button's URL link 2", "Back", "post", "l2", "Continue", "post", "l3", "", "", "", "", "", "", "",url );
    res.end(frame);

  // label 3
  } else if (req.url === "/l3") {
    await parseReq(req, "t2");
    res.writeHead(200, { co });
    const frame = constructor( obj[addr].bg, "Enter button's label 3", "Back", "post", "t2", "Continue", "post", "t3", "", "", "", "", "", "", "",url );
    res.end(frame);

  // target 3
  } else if (req.url === "/t3") {
    await parseReq(req, "l3");
    res.writeHead(200, { co });
    const frame = constructor( obj[addr].bg, "Enter button's URL link 3", "Back", "post", "l3", "Continue", "post", "l4", "", "", "", "", "", "", "",url );
    res.end(frame);

  // label 4
  } else if (req.url === "/l4") {
    await parseReq(req, "t3");
    res.writeHead(200, { co });
    const frame = constructor( obj[addr].bg, "Enter button's label 4", "Back", "post", "t3", "Continue", "post", "t4", "", "", "", "", "", "", "",url);
    res.end(frame);

  // target 4
  } else if (req.url === "/t4") {
    await parseReq(req, "l4");
    res.writeHead(200, { co });
    const frame = constructor( obj[addr].bg, "Enter button's URL link 4", "Back", "post", "t3", "Done", "post", "do", "", "", "", "", "", "", "",url );
    res.end(frame);

  // finish frame
  } else if (req.url === "/do") {
    await parseReq(req, "t4");
    res.writeHead(200, { co });
    const frame = constructor( obj[addr].bg, "", "Restart", "post", "", "Show frame's URL", "link", uid, "", "", "", "", "", "", "",url );
    res.end(frame);

  // user's frame
  } else if (req.url.length == 37) {
    try {
      let id = req.url.substring(1);
      res.writeHead(200, { co });
      const frame = constructor( obf[id].bg, "", obf[id].l1, "link", obf[id].t1, obf[id].l2, "link", obf[id].t2, obf[id].l3, "link", obf[id].t3, obf[id].l4, "link", obf[id].t4, sc,"" );
      res.end(frame);
    } catch (e) {
      console.log(e);
      res.end("Frame not found");
    }

  // Catchall 404 Route
  } else {
    res.writeHead(404, { co });
    res.end("Page not found");
  }
});

//main
function parseReq(req, p) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {body += chunk.toString();});
    req.on("end", () => {
      try {
        const parsedBody = JSON.parse(body).untrustedData;
        addr = parsedBody.walletAddress ? parsedBody.walletAddress : parsedBody.address; // compatible with Farcaster spec
        const text = parsedBody.inputText;
        const bi = parsedBody.buttonIndex;
        obj[addr] = obj[addr] ? obj[addr] : {}; // init object

         // continue or done buttons
        if (bi == 2) {
          obj[addr][p] = text == "" ? (p == "bg" ? rimg : "") : text; // fix empty image's url
        }

        // set uuid and save
        if (p == "t4") {
            uid = crypto.randomUUID();
            obf[uid] = obj[addr]; 
            obf[uid].ad = addr; fs.writeFileSync("storage.txt", JSON.stringify(obf)); 
         
          }

       
      } catch (e) {
        console.log(e);
      }
      resolve();
    });
  });
}

function constructor( img, text, l1, a1, t1, l2, a2, t2, l3, a3, t3, l4, a4, t4, js,post_url ) {
  var i = 1;
  var f = `
    <html>
       <head>  
            <meta property="og:title" content="Framer">
            <meta property="og:image" content="${img}">
            <meta property="of:accepts:xmtp" content="2024-02-01">
            <meta name="of:version" content="vNext">
            <meta property="fc:frame" content="vNext">
            <meta property="fc:frame:image" content="${img}">`;

  if (text != "") {
    f = f + ` <meta property="fc:frame:input:text" content="${text}">`;
  }
  if (l1 != "") {
    f = f + `
            <meta property="fc:frame:button:${i}" content="${l1}">
            <meta property="fc:frame:button:${i}:action" content="${a1}">
            <meta property="fc:frame:button:${i}:target" content="${post_url}${t1}">`;
    i += 1;
  }
  if (l2 != "") {
    f = f + `
            <meta property="fc:frame:button:${i}" content="${l2}">
            <meta property="fc:frame:button:${i}:action" content="${a2}">
            <meta property="fc:frame:button:${i}:target" content="${post_url}${t2}">`;
    i += 1;
  }
  if (l3 != "") {
    f = f + `
            <meta property="fc:frame:button:${i}" content="${l3}">
            <meta property="fc:frame:button:${i}:action" content="${a3}">
            <meta property="fc:frame:button:${i}:target" content="${post_url}${t3}">`;
    i += 1;
  }
  if (l4 != "") {
    f = f + `
            <meta property="fc:frame:button:${i}" content="${l4}">
            <meta property="fc:frame:button:${i}:action" content="${a4}">
            <meta property="fc:frame:button:${i}:target" content="${post_url}${t4}">`;
  }
  f = f + `
          </head>
      <body>${js}</body>
    </html>`;

  return f;
}


server.listen(3000, () => {
  console.log("Server running on port 3000");
});
