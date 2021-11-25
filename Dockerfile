FROM adams549659584/wechaty-base:node16.13.0-alpine3.14 as base

# development production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# 设置阿里云源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# 修改时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata \
    && rm -rf /tmp/* /var/cache/apk/* 

# 使用基础镜像 装依赖阶段
FROM base as build

COPY . /app

WORKDIR /app

RUN npm config set registry https://registry.npm.taobao.org

RUN  npm install && npm build

# 复制dist
FROM base

COPY --from=build /app/dist /app

CMD node main.js

