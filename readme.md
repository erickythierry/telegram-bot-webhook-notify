# Telegram Bot Para notificações via POST webhook

Este é um exemplo simples de como criar um bot do Telegram usando Node.js e a biblioteca `node-telegram-bot-api`.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes coisas:

- Uma conta do Telegram
- Node.js e npm instalados em seu computador
- Um editor de código (opcional)

## Instruções

### Passo 1: Criar um novo bot no Telegram

Para criar um novo bot no Telegram, siga estas instruções:

1. Abra o Telegram e procure o bot `BotFather`.
2. Inicie uma conversa com o `BotFather` e envie a mensagem `/newbot`.
3. O `BotFather` solicitará um nome para o seu bot. Envie uma mensagem com o nome desejado.
4. Em seguida, o `BotFather` solicitará um nome de usuário para o seu bot. O nome de usuário deve terminar com a palavra "bot". Por exemplo, se você quiser que o nome de usuário do seu bot seja `myawesometelegrambot`, envie a mensagem `myawesometelegrambot_bot`.
5. O `BotFather` irá gerar um token de acesso para o seu bot. Guarde esse token em um lugar seguro, pois você precisará dele para interagir com o seu bot por meio da API do Telegram.

### Passo 2: Configurar as variáveis de ambiente

Para manter informações sensíveis, como tokens e chaves de API, seguras, é uma boa prática armazená-las em variáveis de ambiente. Para este projeto, você precisará definir as seguintes variáveis de ambiente:

- `BOT_TOKEN`: O token de acesso do seu bot, que você obteve no passo anterior.
- `CHAT_ID`: O ID do chat para o qual você deseja enviar notificações. Para descobrir o ID do chat, você pode enviar uma mensagem para o bot pelo Telegram e usar a API do Telegram para recuperar o ID do chat.
- `AUTH_TOKEN`: Um token secreto de sua escolha, que será usado para autenticar as solicitações de notificação.

Crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes linhas:

```
BOT_TOKEN=seu_token_de_acesso_aqui
CHAT_ID=seu_id_de_chat_aqui
AUTH_TOKEN=seu_token_secreto_aqui
```

Substitua `seu_token_de_acesso_aqui`, `seu_id_de_chat_aqui` e `seu_token_secreto_aqui` pelos valores correspondentes. Lembre-se de nunca compartilhar suas chaves de API ou tokens de acesso publicamente.

### Passo 2.1: Como conseguir o chat id

1. Inicie o bot que você criou anteriormente. 

2. Envie uma mensagem para o bot no Telegram.

3. Visite a URL https://api.telegram.org/bot\<seu_bot_token\>/getUpdates em seu navegador ou por meio de uma solicitação HTTP. Substitua \<seu_bot_token\> pelo token de autenticação do seu bot.

4. Você verá uma resposta JSON contendo várias informações, incluindo o `chat_id` da conversa que você acabou de iniciar com o bot. Procure a seção `"chat"` do JSON e encontre o valor da chave `"id"`.

Por exemplo, se a resposta JSON contiver o seguinte:

```json
{
  "ok": true,
  "result": [
    {
      "update_id": 123456789,
      "message": {
        "message_id": 1,
        "from": {
          "id": 987654321,
          "is_bot": false,
          "first_name": "John",
          "last_name": "Doe",
          "username": "johndoe",
          "language_code": "en"
        },
        "chat": {
          "id": 987654321,
          "first_name": "John",
          "last_name": "Doe",
          "username": "johndoe",
          "type": "private"
        },
        "date": 1620381542,
        "text": "Hello, bot!"
      }
    }
  ]
}
```

O `chat_id` é `987654321`. Copie esse valor e defina a variável de ambiente `CHAT_ID` com esse valor.


### Passo 3: Instalar as dependências do projeto

Abra um terminal na raiz do projeto e execute o seguinte comando para instalar as dependências do projeto:

```
npm install
```

### Passo 4: Executar o bot

Para executar o bot, execute o seguinte comando na raiz do projeto:

```
npm start
```

Isso iniciará o bot e ele estará pronto para receber e enviar mensagens.

### Passo 5: Enviar notificações por meio da API

```js
let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Authorization": "Bearer TOKEN_DE_AUTORIZAÇÃO"
}
let mensagem = 'ola mundo!'

fetch("http://localhost:3000/notify?message=" + mensagem, {
    method: "POST",
    headers: headersList
})
    .then(async response => {
        console.log(await response.text())
    })
```

Este comando enviará uma solicitação HTTP POST para o endpoint `/notify` do seu servidor local na porta 3000, contendo um objeto JSON com uma propriedade `message`.

Se a solicitação for bem-sucedida, o bot enviará uma mensagem contendo o texto `Olá, mundo!` para o chat com o ID especificado na variável de ambiente `CHAT_ID`.

## Conclusão

Este é apenas um exemplo simples de como criar um bot do Telegram usando Node.js e a biblioteca `node-telegram-bot-api`. Existem muitas outras coisas que você pode fazer com bots do Telegram, como processamento de linguagem natural, interações com banco de dados e integração com outras APIs. Espero que este projeto tenha sido útil para você começar.