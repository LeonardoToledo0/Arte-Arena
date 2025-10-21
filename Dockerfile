# Usar uma imagem oficial do Node 20 como base para a build
FROM node:20-alpine AS build-stage

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependência (package.json e yarn.lock) para o container
COPY package.json yarn.lock ./

# Instalar as dependências usando Yarn
RUN yarn install --frozen-lockfile

# Copiar o restante do código fonte para o container
COPY . .

# Compilar a aplicação Vue.js
RUN yarn build

# Usar uma imagem oficial do Nginx para servir a build estática
FROM nginx:alpine AS production-stage

# Copiar a pasta dist gerada pelo build do Vue para dentro do diretório padrão do Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiar o arquivo de configuração do Nginx (opcional, mas recomendado para lidar com rotas do Vue Router)
COPY nginx.conf /etc/nginx/nginx.conf

# Expor a porta 80 (padrão do Nginx)
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]