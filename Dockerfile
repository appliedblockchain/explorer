FROM node:10.3.0

ARG NPM_TOKEN

# Add non-root user with account name & user group name 'explorer'.
# [Node best practice]
RUN useradd --user-group --create-home --shell /bin/false explorer

ENV HOME=/home/explorer
ENV NODE_ENV=production

# Copy app files to container before switching to non-root user.
COPY package.json server.js $HOME/app/
COPY build $HOME/app/build

# Change ownership to allow installing npm dependencies.
RUN chown -R explorer:explorer $HOME/*

# Switch to newly created User
USER explorer

WORKDIR $HOME/app

# Install private npm module using token
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc && npm install && rm ~/.npmrc

EXPOSE 3000

# Lets run it :)
CMD ["npm", "start"]
