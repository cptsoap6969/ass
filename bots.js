const WebSocket = require("ws");
const Fs = require("fs");
const Request = require("request");
const Socks = require("socks");
const HttpAgent = require("https-proxy-agent");
const SocketClient = require("socket.io")(8080);
var Proxies = null;
var ProxiesType = null;

var BotNames = 'Likes!!!';
var ass = '[bonk]';
var Bots = [];

global.client = {
	origin: null,
	ip: null,
	mouseX: 0,
	mouseY: 0
};

SocketClient.on('connection', (socket) => {
	console.log("[SERVER]: Welcome to NEL99 Personal Bots");
	console.log("[SERVER]: Client Connected");

	socket.on('init', (data) => {
		console.log("[SERVER]: Petition To Start Bots Received!");

		client.origin = data.origin;
		client.ip = data.ip;

		ProxiesType = client.origin == "http://mgar.io" || client.origin == "http://alis.io" ? "http" : "socks";

		Proxies = Fs.readFileSync(ProxiesType + "Proxies.txt", "utf8").split("\n");

		if(client.origin == "http://gaver.io"){
			let i = 0;
			setInterval(() => {
				if(i < Proxies.length){
					Bots.push(new Bot(i));
					i++
				}
			}, 320);
		}
		else for(let i in Proxies) Bots.push(new Bot(i));

		if (client.origin == "http://gota.io");
		{
		this.name = ass + " | " + this.id;
		}
		console.log("[SERVER]: Connecting Bots...");
		console.log("[SERVER]: Origin: " + client.origin);
		console.log("[SERVER]: Server IP: " + client.ip);
		console.log("[SERVER]: Using " + ProxiesType + " Proxies");
	});

	socket.on('mouse', (data) => {
		client.mouseX = data.x;
		client.mouseY = data.y;
	});

	socket.on('split', () => {
		for(let i in Bots){
			Bots[i].send(new Buffer([17]));
			if(client.origin == "http://mgar.io"){
				Bots[i].send(new Buffer([56]));
			}
		}
	});

	socket.on('eject', () => {
		for(let i in Bots){
			Bots[i].send(new Buffer([21]));
			Bots[i].send(new Buffer([36]));
			if(client.origin == "http://mgar.io"){
				Bots[i].send(new Buffer([57]));
			}
		}
	});

	socket.on('disconnect', () => {
		console.log("[SERVER]: Client Disconnected");
	});

});

class BufferWriter {
	constructor(){
		this.bytes = [];
	}
	writeU8(byte){
		this.bytes.push(byte);
	}
	writeString(string){
		this.bytes.push(string.length & 0xFF);
		this.bytes.push(string.length >> 8 & 0xFF);
		for(let i = 0; i < string.length; i++){
			this.bytes.push(string.charCodeAt(i) & 0xFF);
			this.bytes.push(string.charCodeAt(i) >> 8 & 0xFF);
		}
	}
	buffer(){
		return new Buffer(this.bytes);
	}
}

class Bot {
	constructor(id){
		this.id = id;
		this.ws = null;
		//this.name = BotNames + " | " + this.id;
		this.name = BotNames
		this.proxy = Proxies[this.id].split(":");

		this.agent = ProxiesType == "socks" ? new Socks.Agent({
			proxy: {
				ipaddress: this.proxy[0],
				port: this.proxy[1],
				type: 5
			}
		}) : new HttpAgent("http://" + Proxies[this.id]);

		this.headers = {
			'Accept-Encoding': 'gzip, deflate',
			'Accept-Language': 'ca-ES,ca;q=0.8, en;q=0.6',
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
		};

		if(client.origin == "http://mgar.io" || client.origin == "http://alis.io"){
			this.cookie((cookie) => {
				this.headers['cookie'] = cookie;
				this.connect();
			});
		}
		this.connect();
	}
	send(buffer){
		if(this.ws && this.ws.readyState !== 1) return;
		if(this.ws && this.ws.readyState === 1) this.ws.send(buffer);
	}
	connect(){
		this.ws = new WebSocket(client.ip, {
			origin: client.origin,
			headers: this.headers,
			agent: this.agent
		});
		this.ws.binaryType = "nodebuffer";
		this.ws.onopen = this.open.bind(this);
		this.ws.onerror = this.error.bind(this);
	}
	inits(){
		switch(client.origin){
			case "http://cellcraft.io":
				this.send(new Buffer([254, 5, 0, 0, 0]));
				this.send(new Buffer([255, 50, 137, 112, 79]));
				this.send(new Buffer([42]));
				setInterval(function(){
					this.send(new Buffer([90, 51, 24, 34, 131]));
				}.bind(this), 1750);
				break;
			case "http://gaver.io": case "http://wair.io":
				this.send(new Buffer([254, 5, 0, 0, 0]));
				this.send(new Buffer([255, 0, 0, 0, 0]));
				break;
			case "http://nbk.io":
				this.send(new Buffer([254, 5, 0, 0, 0]));
				this.send(new Buffer([214, 5, 0, 0, 0]));
				this.send(new Buffer([255, 0, 0, 0, 0]));
				this.send(new Buffer([215, 0, 0, 0, 0]));
				break;
			case "http://mgar.io":
				this.send(new Buffer([254, 5, 0, 0, 0]));
				this.send(new Buffer([255, 109, 103, 97, 114]));
				this.send(new Buffer([80]));
				break;
			case "http://alis.io":
				this.send(new Buffer([254, 5, 0, 0, 0]));
				this.send(new Buffer([255, 35, 18, 56, 9]));
				break;
			case "http://galx.io":
				this.send(new Buffer([254, 5, 0, 0, 0]));
				this.send(new Buffer([255, 166, 126, 112, 79]));
				this.send(new Buffer([45]));
				setInterval(function(){
					this.send(new Buffer([90, 51, 24, 34, 13]));
				}.bind(this), 1750);
				break;
			case "http://gota.io":
				this.send(new Buffer([255, 71, 111, 116, 97, 32, 87, 101, 98, 32, 49, 46, 52, 46, 53, 0]));
				this.send(new Buffer([10, 0, 255, 255, 0, 0, 0, 0]));
				this.send(new Buffer([71]));
				setInterval(function(){
					this.send(new Buffer([71]));
				}.bind(this), 30000);
				break;
			case "http://dual-agar.me":
				let buf = new BufferWriter();
				buf.writeU8(30);
				buf.writeString(this.name);
				buf.writeString("");
				buf.writeString("http://i.imgur.com/k4heQm4.jpg");
				buf.writeString("");
				buf.writeString("http://i.imgur.com/k4heQm4.jpg");
				this.send(new Buffer([252, 10, 0, 111, 0, 110, 0, 120, 0, 99, 0, 110, 0, 107, 0, 95, 0, 49, 0, 48, 0, 49, 0, 5, 0, 37, 0, 85, 0, 85, 0, 71, 0, 102, 0]));
				this.send(buf.buffer());
				setInterval(function(){
					this.send(new Buffer([130]));
				}.bind(this), 1000);
				break;
		}
	}
	spawn(){
		var buf = null;
		switch(client.origin){
			case "http://cellcraft.io":
				buf = new Buffer(3 + 2 * this.name.length);
				buf.writeUInt8(0, 0);
				buf.writeUInt16LE(59, 1);
				for(let i = 0; i < this.name.length; i++) buf.writeUInt16LE(this.name.charCodeAt(i), 3 + 2 * i);
				this.send(new Buffer([42]));
				this.send(buf);
				break;
			case "http://gaver.io": case "http://nbk.io": case "http://wair.io": case "http://galx.io":
				buf = new Buffer(1 + 2 * this.name.length);
				buf.writeUInt8(0, 0);
				for(let i = 0; i < this.name.length; i++) buf.writeUInt16LE(this.name.charCodeAt(i), 1 + 2 * i);
				this.send(buf);
				break;
			case "http://mgar.io":
				buf = [];
				buf.push(0, 60, 0, 34, 0, 115, 0, 107, 0, 105, 0, 110, 0, 34, 0, 58, 0, 34, 0, 110, 0, 111, 0, 115, 0, 107, 0, 105, 0, 110, 0, 34, 0, 44, 0, 34, 0, 104, 0, 97, 0, 116, 0, 34, 0, 58, 0, 34, 0, 34, 0, 62);
				buf.push(0);
				for(let i = 0; i < this.name.length; i++) buf.push(this.name.charCodeAt(i), 0);
				this.send(new Buffer(buf));
				break;
			case "http://alis.io":
				var skin = "http://i.imgur.com/k4heQm4.jpg";
				var data = '{"name":"' + this.name + '","skinurl":"' + skin + '","team":""}';
				buf = new Buffer(1 + 2 * data.length);
				buf.writeUInt16LE(0, 0);
				for(let i = 0; i < data.length; i++) buf.writeUInt16LE(data.charCodeAt(i), 1 + 2 * i);
				this.send(buf);
		    	break;
		    case "http://gota.io":
		    	let offset = 1;
		    	buf = new Buffer(1 + 2 * (this.name.length + 1));
				buf.writeUInt8(0, 0);
		    	for(let i = 0; i < this.name.length; i++) buf.writeUInt16LE(this.name.charCodeAt(i), offset), offset += 2;
		    	buf.writeUInt16LE(0, offset);
		    	this.send(buf);
		    	break;
		    case "http://dual-agar.me":
		    	this.send(new Buffer([31]));
		    	break;
		}
	}
	moveTo(x, y){

		var buf = null;

		if(client.origin == "http://alis.io" || client.origin == "http://gota.io" || client.origin == "http://dual-agar.me"){
			x += ~~(Math.random() * 350);
			y += ~~(Math.random() * 350);
		}

		switch(client.origin){
			case "http://cellcraft.io": case "http://gaver.io": case "http://nbk.io": case "http://wair.io": case "http://alis.io": case "http://galx.io": case "http://dual-agar.me":
				buf = new Buffer(13);
				buf.writeUInt8(16, 0);
				buf.writeInt32LE(x, 1);
				buf.writeInt32LE(y, 5);
				buf.writeUInt32LE(0, 9);
				this.send(buf);
				break;
			case "http://mgar.io":
				buf = new Buffer(21);
				buf.writeUInt8(16, 0);
				buf.writeDoubleLE(x, 1);
				buf.writeDoubleLE(y, 9);
				buf.writeUInt32LE(0, 17);
				this.send(buf);
				break;
			 case "http://gota.io":
			 	buf = new Buffer(5);
			 	buf.writeUInt8(16, 0);
			 	buf.writeInt16LE(x, 1);
			 	buf.writeInt16LE(y, 3);
			 	this.send(buf);
			 	break;
		}
	}
	cookie(callback){
        Request({
            url: client.origin,
            agent: this.agent,
            headers: this.headers
        },
        function(error, response, body){
            if(!error && response.headers["set-cookie"]){
                callback(response.headers["set-cookie"]);
            }
        });
    }
	open(){
		this.inits();
		setInterval(function(){
			this.spawn();
		}.bind(this), 1000);
		setInterval(function(){
			this.moveTo(client.mouseX, client.mouseY);
		}.bind(this), 100);
	}
	error(){
		this.connect();
	}
}
