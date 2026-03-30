FROM node:18

WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .

# 🔥 Install kubectl inside container
RUN apt-get update && apt-get install -y curl \
    && curl -LO "https://dl.k8s.io/release/v1.30.0/bin/linux/amd64/kubectl" \
    && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

EXPOSE 3000

CMD ["node", "app.js"]
