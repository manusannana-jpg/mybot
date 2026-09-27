const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const P = require('pino');
const qrcode = require('qrcode-terminal');
async function start(){
const {state, saveCreds} = await useMultiFileAuthState('auth');
const sock = makeWASocket({ auth: state, logger: P({level:'silent'}), browser: ["Ubuntu","Chrome","20.0"] });
sock.ev.on('creds.update', saveCreds);
sock.ev.on('connection.update', u=>{
 const {connection, qr} = u;
 if(qr){ console.log('QR එක:'); qrcode.generate(qr, {small:true}); }
 if(connection==='open') console.log('✅ 24H BOT ONLINE');
});
sock.ev.on('messages.upsert', async m=>{
 const msg=m.messages[0];
 if(!msg.message || msg.key.fromMe) return;
 await sock.sendMessage(msg.key.remoteJid, {text: "Bot Online ✅ 24H"});
});
}
start();
