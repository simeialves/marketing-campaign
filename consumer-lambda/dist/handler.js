"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    for (const record of event.Records) {
        const body = JSON.parse(record.body);
        const { title, emails, message } = body;
        console.log(`📣 Iniciando campanha: ${title}`);
        for (const email of emails) {
            console.log(`Enviando mensagem para: ${email}`);
            console.log(`Mensagem: ${message}`);
        }
        console.log(`Campanha "${title}" processada com sucesso.`);
    }
};
exports.handler = handler;
