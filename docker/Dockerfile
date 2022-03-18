# Select reference image
FROM node:14-alpine

# This is optional. Sets the level of logging that you see
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory

RUN mkdir -p /usr/src/app/node_modules
WORKDIR /usr/src/app

# Copy project files into the docker image
COPY . .

# 
EXPOSE 8008
EXPOSE 3000

# RUN npm install -g pnpm

#bootstrap lerna
# RUN mv ./node_modules ./node_modules.tmp \
#   && mv ./node_modules.tmp ./node_modules \
#   && pnpm set progress=false && pnpm install 
# RUN cd /usr/src/app/packages/client && pnpm install && pnpm build && cd ../server && pnpm install

# RUN pnpm set progress=false && pnpm run bootstrap 
## RUN pnpm set progress=false && npm run start
# RUN pnpm set progress=false && pnpm run build

#ALL start
# WORKDIR /usr/src/app/packages/client
#CMD ["pnpm", "run", "start"]
#WORKDIR /usr/src/app/packages/server
# ENTRYPOINT ["pnpm", "run", "start"]
