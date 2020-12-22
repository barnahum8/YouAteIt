FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY client/my-app/ ./my-app/
RUN cd my-app && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/my-app/build ./my-app/build
COPY server/package*.json ./server/
RUN cd server && npm install
COPY server/src/server.ts ./server/

EXPOSE 3080

CMD ["node", "./server/server.ts"]