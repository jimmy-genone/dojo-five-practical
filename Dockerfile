FROM node:16 AS build

# grab tool to remove unnecessary items from node_modules
RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

WORKDIR /app

COPY package*.json /app

RUN npm ci && npm cache clean --force
COPY . /app
RUN /app/node_modules/.bin/nx build api --prod && npm prune --production && /usr/local/bin/node-prune

FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/dist/apps/api/* ./
COPY --from=build /app/node_modules ./node_modules

ENV SECRET=genonedojofive
ENV TZ=America/New_York

EXPOSE 3333

CMD [ "node", "main.js" ]
