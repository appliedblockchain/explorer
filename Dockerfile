#+-----------------------------------------------------------------------------#
#|                             BUILD CLIENT                                    |
#+-----------------------------------------------------------------------------#

FROM node:10.3.0 as client
ARG NPM_TOKEN
COPY . /app
WORKDIR /app

# Install dependencies to build client + latest client using token
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc && \
  npm install && \
  npm install @appliedblockchain/block-explorer-client && \
  rm ~/.npmrc
RUN npm run build





#+-----------------------------------------------------------------------------#
#|                               BUILD SERVER                                  |
#+-----------------------------------------------------------------------------#

FROM node:10.3.0
ARG NPM_TOKEN
ENV HOME=/home/explorer
ENV NODE_ENV=production
EXPOSE 3000

# Add non-root user with account name & user group name 'explorer'.
# [Node best practice]
RUN useradd --user-group --create-home --shell /bin/false explorer

# Copy app files to container before switching to non-root user.
COPY package.json server.js $HOME/app/
COPY --from=client /app/build $HOME/app/build

# Change ownership to allow installing npm dependencies.
RUN chown -R explorer:explorer $HOME/*

# Switch to newly created User
USER explorer
WORKDIR $HOME/app

# Install npm module + latest server component using token
RUN \
  echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc && \
  npm install && \
  npm install @appliedblockchain/block-explorer-server && \
  rm ~/.npmrc

# Lets run it :)
CMD ["node", "server.js"]
