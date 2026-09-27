const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const P = require('pino');
async function start(){
const {state, saveCreds} = await useMultiFileAuthState('auth');
const sock = makeWASocket({ auth: state, logger: P({level:'silent'}), browser: ["Ubuntu","Chrome","20.0"], keepAliveIntervalMs: 10000 });
sock.ev.on('creds.update', saveCreds);
sock.ev.on('connection.update', u=>{
 if(u.connection==='open') console.log('✅ 24H BOT ONLINE - Data Off උනත් වැඩ');
 if(u.connection==='close') start();
});
sock.ev.on('messages.upsert', async m=>{
 const msg=m.messages[0];
 if(!msg.message || msg.key.fromMe) return;
 await sock.sendMessage(msg.key.remoteJid, {text: "Bot Online ✅ Data Off උනත් වැඩ!"});
});
}
start();
