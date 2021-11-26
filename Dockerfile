### DEV环境 ###
FROM adams549659584/wechaty-base:node16.13.0-alpine3.14 AS development

# 定位到容器工作目录
WORKDIR /usr/src/app

# 拷贝package.json
COPY package*.json ./

# 淘宝源
# RUN npm config set registry https://registry.npmmirror.com/
RUN npm install

COPY . .

RUN npm run build


### PROD环境 ###
FROM adams549659584/wechaty-base:node16.13.0-alpine3.14 as production

# # 设置阿里云源
# # RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# # 修改时区
# RUN apk --update add tzdata \
#     && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
#     && echo "Asia/Shanghai" > /etc/timezone \
#     && apk del tzdata \
#     && rm -rf /tmp/* /var/cache/apk/* 

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# 淘宝源
# RUN npm config set registry https://registry.npmmirror.com/
# 生产环境
RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
