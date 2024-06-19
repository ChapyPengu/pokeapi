FROM oven/bun:latest as base

WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

EXPOSE 8000

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app .
COPY --from=prerelease /usr/src/app/package.json .

USER bun

ENTRYPOINT [ "bun", "run" , "./server/index.js" ]