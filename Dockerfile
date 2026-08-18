# Verwende das offizielle leichtgewichtige Nginx-Image
FROM nginx:alpine

# Kopiere index.html in das Nginx HTML-Verzeichnis
COPY index.html /usr/share/nginx/html/index.html

# Exponiere Port 80 (Standard HTTP)
EXPOSE 80

# Starte Nginx
CMD ["nginx", "-g", "daemon off;"]
