FROM node:latest

# RUN npm install --save-dev \
#         webpack webpack-cli webpack-dev-server \
#         @babel/core @babel/preset-env @babel/preset-react babel-loader \
#         # babel-plugin-import \
#         babel-plugin-styled-components \
#         css-loader style-loader \
#         html-webpack-plugin react-dev-utils

# RUN npm install react react-dom react-router-dom \
#                 preact preact-compat

ADD ./* /home/node

RUN export NODE_PATH=src

EXPOSE 8080

WORKDIR /home/node

ENTRYPOINT [ "/bin/bash" ]