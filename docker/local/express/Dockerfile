ARG NODE_VERSION=16-alpine3.12

FROM node:${NODE_VERSION}

LABEL name="mern-ISALE"
LABEL license="MIT"
LABEL description="MERN ISALE image"

ENV NODE_ENV=development

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

RUN addgroup --system isale \
    && adduser --system --ingroup isale isale


COPY package*.json ./

RUN npm install

COPY --chown=isale:isale . ${APP_HOME}

RUN chown isale:isale ${APP_HOME}

USER isale

CMD [ "npm","run","dev" ]