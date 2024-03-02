# streem-client

## Run the application using docker

```sh
docker build -t stream-client .
docker run -it -p 8080:8080 --rm --name stream-client-1 stream-client
```

## Project Setup for local development

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
