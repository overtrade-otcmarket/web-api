FROM node:20-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive

COPY . .

RUN yarn build


FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app /app

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 3000

EXPOSE 3000

CMD ["node", "--max-old-space-size=4096", "dist/src/main"]
