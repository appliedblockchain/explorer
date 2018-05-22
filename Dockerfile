FROM node:10.1.0

# Node 10 comes with npm v5.6 which can cause issues with npm v6 lockfiles.
RUN npm install -g npm

# Add non-root user with account name & user group name 'explorer'.
# [Node best practice]
RUN useradd --user-group --create-home --shell /bin/false explorer

ENV HOME=/home/explorer
ENV NODE_ENV=production

# Copy app files to container before switching to non-root user.
COPY lerna.json package.json package-lock.json run.js $HOME/app/

# [1]. Copy Server package files
COPY server/package.json server/package-lock.json $HOME/app/server/
COPY server/build $HOME/app/server/build

# [2]. Copy Client package files
COPY client/package.json client/package-lock.json $HOME/app/client/
COPY client/build $HOME/app/client/build

# Change ownership to allow installing npm dependencies.
RUN chown -R explorer:explorer $HOME/*

# Switch to newly created User
USER explorer

WORKDIR $HOME/app
RUN npm install

EXPOSE 3000

# Lets run it :)
CMD ["npm", "start"]
