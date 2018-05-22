FROM node:10

RUN npm install -g npm

# Add non-root user with account name & user group name 'explorer'.
# [Node best practice]
RUN useradd --user-group --create-home --shell /bin/false explorer

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY package.json package-lock.json /app/
COPY build/ /app/build/
COPY public/ /app/public/

RUN chown -R explorer:explorer /app

USER explorer

RUN npm i

ENTRYPOINT npm start