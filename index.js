const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const botToken = process.env.BOT_TOKEN
const chatId = process.env.CHAT_ID
const authToken = process.env.AUTH_TOKEN

const bot = new TelegramBot(botToken, { polling: true })

// Função para log das mensagens recebidas pelo bot
bot.on('message', (msg) => {
    console.log('📩 mensagem recebida no telegram:\n', JSON.stringify(msg, null, 2))
})

const app = express()

app.use(bodyParser.json());

// Middleware para autenticar o token de autenticação
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Obter o token do cabeçalho de autorização
    if (token !== authToken) {
        return res.status(401).json({ error: 'Token de autenticação inválido' });
    }
    next();
};

// Rota para receber notificações
app.post('/notify', authenticateToken, (req, res) => {
    const { message } = req.query;
    // Enviar a notificação
    bot.sendMessage(chatId, message)
        .then(() => {
            console.log('webhook solicitado, enviando notificação...')
            console.log(req.body)
            res.json({ message: 'Notificação enviada com sucesso' })
        })
        .catch((error) => {
            console.log('erro ao enviar notificação', error.message)
            res.status(500).json({ error: 'Ocorreu um erro ao enviar a notificação', details: error })
        });
})

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
