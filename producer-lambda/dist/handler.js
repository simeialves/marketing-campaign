"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const yup = __importStar(require("yup"));
// Setup SQS
const sqs = new aws_sdk_1.SQS();
// Validação com Yup
const campaignSchema = yup.object({
    title: yup.string().required(),
    message: yup.string().required(),
    emails: yup.array().of(yup.string().email()).required(),
});
const handler = async (event) => {
    try {
        const body = JSON.parse(event.body || "{}");
        // Validação do corpo
        await campaignSchema.validate(body, { abortEarly: false });
        // Enviar para SQS
        const queueUrl = process.env.QUEUE_URL;
        const message = {
            MessageBody: JSON.stringify(body),
            QueueUrl: queueUrl,
        };
        await sqs.sendMessage(message).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Campanha enviada com sucesso!" }),
        };
    }
    catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: err.errors || "Erro ao processar requisição.",
            }),
        };
    }
};
exports.handler = handler;
