FROM node:8.11.1

# Add non-root user with account name & user group name 'explorer'.
# [Node best practice]
RUN useradd --user-group --create-home --shell /bin/false explorer

ENV HOME=/home/explorer
ENV NODE_ENV=production

# Copy app files to container before switching to non-root user.
COPY lerna.json package.json package-lock.json run.js $HOME/app/

# [1]. Copy server package files
COPY server/package.json $HOME/app/server/
COPY server/build $HOME/app/server/build

# Change ownership to allow installing npm dependencies.
RUN chown -R explorer:explorer $HOME/*

# Switch to newly created User
USER explorer

WORKDIR $HOME/app
RUN npm install

EXPOSE 3001

# Lets run it :)
CMD ["npm", "run", "start:api"]
