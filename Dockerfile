FROM nginx:latest
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./index.css /usr/share/nginx/html/index.css
COPY ./index.js  /usr/share/nginx/html/index.js
COPY ./fonts usr/share/nginx/html/fonts
COPY ./dictionary.json usr/share/nginx/html/dictionary.json