FROM node:8.11.1

# Add non-root user with account name & user group name 'explorer'.
# [Node best practice]
RUN useradd --user-group --create-home --shell /bin/false explorer

ENV HOME=/home/explorer
ENV NODE_ENV=production

# Copy app files to container before switching to non-root user.
COPY package.json package-lock.json run.js $HOME/app/
COPY server/package.json server/package-lock.json $HOME/app/server/
COPY server/build $HOME/app/server/build

# Change ownership to allow installing npm dependencies.
RUN chown -R explorer:explorer $HOME/*

# Switch to newly created User
USER explorer

# Base
WORKDIR $HOME/app
RUN npm install

# Server
WORKDIR $HOME/app/server
RUN npm install

# Back to Base
WORKDIR $HOME/app

EXPOSE 3001

# Lets run it :)
CMD ["npm", "start"]
