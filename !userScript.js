// ==UserScript==
// @name         NEL99 Personal Bots
// @namespace    nel99.personal.bots
// @version      2.0.0
// @description  Bots for some clones
// @icon         http://i.imgur.com/v7SxlHZ.png
// @author       NEL99
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js
// @match        *.cellcraft.io/*
// @match        *.gaver.io/*
// @match        *.wair.io/*
// @match        *.nbk.io/*
// @match        *.mgar.io/*
// @match        *.galx.io/*
// @match        *.alis.io/*
// @match        *.gota.io/*
// @match        *.dual-agar.me/*
// @grant        none
// ==/UserScript==

window.socket = new io("ws://localhost:8081");

window.client = {
	origin: window.origin,
	ip: null,
	mouseX: 0,
	mouseY: 0,
	log: false
};

window.addEventListener("keydown", (e) => {
	if(e.key == 'x') socket.emit("init", {origin: client.origin, ip: client.ip});
	if(e.key == 't') socket.emit("split");
	if(e.key == 'a') socket.emit("eject");
});

if(client.origin == "http://alis.io" || client.origin == "http://gaver.io"){
	setInterval(() => {
		$("#jwt").val(~~(Math.random() * 9999));
		client.ip = window.webSocket.url.split("?")[0];
		client.mouseX = window.mouseX;
		client.mouseY = window.mouseY;
		socket.emit("mouse", {
			x: client.mouseX,
			y: client.mouseY
		});
	}, 100);
}
else {
	window.WebSocket.prototype.oldSend = window.WebSocket.prototype.send;
	window.WebSocket.prototype.send = function(buffer){
		if(client.log) console.log(new Uint8Array(buffer));
		client.ip = !(this.url.includes('localhost')) ? this.url : null;
		var msg = new DataView(buffer);
		if(msg.getUint8(0) == 16){
			if(msg.byteLength == 21){
				client.mouseX = msg.getFloat64(1, true);
				client.mouseY = msg.getFloat64(9, true);
			}
			else if(msg.byteLength == 13){
				client.mouseX = msg.getInt32(1, true);
				client.mouseY = msg.getInt32(5, true);
			}
			else {
				client.mouseX = msg.getInt16(1, true);
				client.mouseY = msg.getInt16(3, true);
			}
		}
		socket.emit("mouse", {
			x: client.mouseX,
			y: client.mouseY
		});
		this.oldSend(buffer);
	};
}