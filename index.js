const http = require("http");

const post_url =  "https://2c8958d7-f8e4-4b3e-919b-6f3b4c6c5c65-00-ks9vta2iufpo.picard.replit.dev/";
const img_url = "https://i.imgur.com/3WlR6Qb.png";
var obj = {
    "0xA1485801Ea9d4c890BC7563Ca92d90c4ae52eC75": {
      bg: "",
      l1: "1",
      t1: "",
      l2: "2",
      t2: "",
      l3: "3",
      t3: "",
      l4: "4",
    },
  };
  var fid="";

const server = http.createServer((req, res) => {
//Initial frame
  if (req.url === "/") {
    res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
      res.setHeader("Access-Control-Max-Age", 2592000); // 30 day
    res.writeHead(200, { "Content-Type": "text/html" });
    const frame = constructor(img_url,"","Start","post","bg","","","","","","","","","");
    res.write(frame);
    res.end();
// bg url
  } else if (req.url === "/bg") {
    parseReq(req, "ini");
    res.writeHead(200, { "Content-Type": "text/html" });
    const frame = constructor(img_url,"Enter image's URL","Back","post","","Continue","post","l1","","","","","","");
    res.write(frame);
    res.end();
// label 1
  } else if (req.url === "/l1") {
    parseReq(req, "bg");
        res.writeHead(200, { "Content-Type": "text/html" });
    const frame = constructor(img_url,"Enter button's label 1","Back","post","bg","Continue","post","t1","","","","","","");
    res.write(frame);
    res.end();
// target 1
  } else if (req.url === "/t1") {
    parseReq(req, "l1");
    res.writeHead(200, { "Content-Type": "text/html" });
    const frame = constructor(img_url,"Enter button's URL link 1","Back","post","l1","Continue","post","l2","","","","","","");
    res.write(frame);
    res.end();
// label 2
  } else if (req.url === "/l2") {
    parseReq(req, "t1");
    res.writeHead(200, { "Content-Type": "text/html" });
    const frame = constructor(img_url,"Enter button's label 2","Back","post","t1","Continue","post","t2","","","","","","");
    res.write(frame);
    res.end();
// target 2
  } else if (req.url === "/t2") {
    parseReq(req, "l2");
    res.writeHead(200, { "Content-Type": "text/html" });
    const frame = constructor(img_url,"Enter button's URL link 2","Back","post","l2","Continue","post","l3","","","","","","");
    res.write(frame);
    res.end();
  // label 3
} else if (req.url === "/l3") {
    parseReq(req, "t2");
        res.writeHead(200, { "Content-Type": "text/html" });
    const frame = constructor(img_url,"Enter button's label 3","Back","post","t2","Continue","post","t3","","","","","","");
    res.write(frame);
    res.end();
// target 3
  } else if (req.url === "/t3") {
    parseReq(req, "l3");
    res.writeHead(200, { "Content-Type": "text/html" });
    const frame = constructor(img_url,"Enter button's URL link 3","Back","post","l3","Continue","post","l4","","","","","","");
    res.write(frame);
    res.end();
  // label 4
} else if (req.url === "/l4") {
    parseReq(req, "t3");
        res.writeHead(200, { "Content-Type": "text/html" });
    const frame = constructor(img_url,"Enter button's label 4","Back","post","t3","Continue","post","t4","","","","","","");
    res.write(frame);
    res.end();
// target 4
  } else if (req.url === "/t4") {
    parseReq(req, "l4");
    res.writeHead(200, { "Content-Type": "text/html" });
    const frame = constructor(img_url,"Enter button's URL link 4","Back","post","t3","Done","post","do","","","","","","");
    res.write(frame);
    res.end();

}else if (req.url === "/do") {
    parseReq(req, "done");
    setTimeout(function(){
    res.writeHead(200, { "Content-Type": "text/html" });
    const frame = constructor(img_url,"","Restart","post","","Show frame's URL","link", fid,"","","","","","");
    res.write(frame);
    res.end();
    }, 100) //easter egg
    // user's frame
}else if (req.url.substring(0,3) === "/0x") {
    try {
    let id = req.url.substring(1);
    res.writeHead(200, { "Content-Type": "text/html" });
    const frame = constructor(obj[id].bg,"",obj[id].l1,"link",obj[id].t1,obj[id].l2,"link",obj[id].t2,obj[id].l3,"link",obj[id].t3,obj[id].l4,"link",obj[id].t4);
    res.write(frame);
    } catch (e) {console.log(e);res.write('frame error')}
    res.end();

   

    // Catchall 404 Route
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});




function parseReq(req, p) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString(); // convert Buffer to string
  });
  req.on("end", () => {
    const parsedBody = JSON.parse(body).untrustedData;
    const addr = parsedBody.walletAddress;
    const text = parsedBody.inputText;
    const bi = parsedBody.buttonIndex;
    if (p == "done") {fid = addr}
    if (p == "ini") { obj[addr] = {}; }
    if (bi == 2) { obj[addr][p] = text ? text : ""; }// continue button
    //console.log(parsedBody);
  });
}

function constructor(img,text,l1,a1,t1,l2,a2,t2,l3,a3,t3,l4,a4,t4) {
  frame = `
    <html>
       <head>  
            <meta property="og:image" content="${img}" />
            <meta property="of:accepts:xmtp" content="2024-02-01" />
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${img}" />
            <meta property="fc:frame:input:text" content="${text}" />
            <meta property="fc:frame:button:1" content="${l1}" />
            <meta property="fc:frame:button:1:action" content="${a1}" />
            <meta property="fc:frame:button:1:target" content="${post_url}${t1}" />
            <meta property="fc:frame:button:2" content="${l2}" />
            <meta property="fc:frame:button:2:action" content="${a2}" />
            <meta property="fc:frame:button:2:target" content="${post_url}${t2}" />
            <meta property="fc:frame:button:3" content="${l3}" />
            <meta property="fc:frame:button:3:action" content="${a3}" />
            <meta property="fc:frame:button:3:target" content="${post_url}${t3}" />
            <meta property="fc:frame:button:4" content="${l4}" />
            <meta property="fc:frame:button:4:action" content="${a4}" />
            <meta property="fc:frame:button:4:target" content="${post_url}${t4}" />
          </head>
          <body>Frame's URL is <h3>${post_url}${fid}</h3><br>To use it just embed this in compatible  Farcaster client.<br>The simplest way: <a href="https://getconverse.app/" target="_blank">Converse</a>
      </body>
    </html>`;
  return frame;
}

//function uuid() {
//  return crypto.randomUUID();
//}

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
