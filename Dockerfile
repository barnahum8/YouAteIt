FROM node:10 AS ui-build
WORKDIR /usr/src/app
COPY client/my-app/ ./my-app/
RUN cd my-app && npm install && npm run build

FROM node:10 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/my-app/build ./my-app/build
COPY server/ ./server/
RUN cd server && npm install

EXPOSE 3080

CMD ["node", "./server/src/server.ts"]