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
app.post('/notify', authenticateToken, async (req, res) => {
    let { message } = req.query;

    // caso a requisição nao tenha uma mensagem, o ip de quem requisitou sera enviado como mensagem
    if (!message) message = 'notificação recebida de:' + req.socket.remoteAddress

    const { body } = req
    let corpo = null

    // evita que qualquer erro na conversão de json quebre o codigo
    try {
        corpo = JSON.stringify(body, null, 2)
    } catch (error) {
        console.log(error.message)
    }

    try {
        // Enviar a notificação
        console.log('webhook solicitado, enviando notificação...', body)

        // caso a requisição tenha um body e ele nao esteja vazio, será enviada a notificação formatada com o body nela
        if (corpo && corpo != '{}') await bot.sendMessage(chatId, `<b>${message}</b> \n\n<pre>${corpo}</pre>`, { parse_mode: 'HTML' });

        // caso contrário, será enviada apenas a mensagem recebida na query
        else await bot.sendMessage(chatId, message);

        res.json({ message: 'Notificação enviada com sucesso' })

    } catch (error) {
        console.log('erro ao enviar notificação', error.message)
        res.status(500).json({ error: 'Ocorreu um erro ao enviar a notificação', details: error })
    }
})

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
