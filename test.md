1. Installation de l'application en local:
* Clonage du projet :
    git clone https://github.com/wiem-kb/exam.git
    cd exam

* Installation des dépendances :
    npm install

* Lancement de l'application :
    npm start

==> L’application démarre sur :
http://localhost:3000

2. Dockerfile
* Création d’un fichier Dockerfile
    FROM node:18-alpine

    WORKDIR /app

    COPY package*.json ./

    RUN npm install

    COPY . .

    EXPOSE 3000

    CMD ["npm", "start"]

* Construction de l'image :
    docker build -t todo-app .

* Exécution :
    docker run -p 3000:3000 todo-app

3. docker-compose.yml
* Création d’un fichier docker-compose.yml 
    version: "3"
services:
  app:
    build: .
    container_name: todo-app
    ports:
      - "3000:3000"
    restart: always

* Lancement via compose 
    docker compose up --build

4. Jenkinsfile
    * Pipeline CI/CD avec :
        Checkout
        Installation dépendances
        Tests
        Build Docker
        Compatible Windows