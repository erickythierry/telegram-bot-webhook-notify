FROM node:alpine

# Crie o diretório do aplicativo
WORKDIR /app

# Copie o arquivo package.json para o diretório do aplicativo
COPY package.json .

# Instale as dependências do aplicativo
RUN npm install

# Copie todos os arquivos do aplicativo para o diretório do aplicativo
COPY . .
# Expõe a porta 3000 para que possamos acessar o servidor Express
EXPOSE 3000

# Inicie o aplicativo
CMD ["node", "index.js"]
