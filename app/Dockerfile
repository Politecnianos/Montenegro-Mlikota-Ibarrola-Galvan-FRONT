# Stage 1: Build the Angular application
FROM node:20 AS builder

WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install

# Copia el código fuente y construye la aplicación
COPY . .
RUN ng build --configuration=production

# Stage 2: Serve the application using ng serve
FROM node:20 AS runner

WORKDIR /app

# Copia los archivos necesarios del contenedor anterior
COPY --from=builder /app .

# Instala Angular CLI en el contenedor de ejecución
RUN npm install -g @angular/cli

EXPOSE 4200

# Comando para ejecutar la aplicación Angular
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
