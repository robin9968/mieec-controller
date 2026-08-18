# MIIEC Controller – Home Server Deployment

Dieses Verzeichnis enthält alles, was Sie benötigen, um die deutsche MIIEC-Controller-App dauerhaft als Docker-Container oder VM auf Ihrem Home Server zu betreiben.

## 📁 Struktur der Dateien
* **`app/`**: Enthält das Web-Interface (`index.html`) und die Bluetooth-Logik.
* **`Dockerfile`**: Paketiert das Web-Interface in ein schlankes Nginx-Webserver-Image.
* **`docker-compose.yml`**: Konfigurationsdatei für das einfache Starten des Containers.

---

## 🛠️ Schritt 1: Code auf GitHub hochladen

Um das Projekt einfach auf Ihren Home Server zu clonen, laden Sie es in ein GitHub-Repository hoch:

1. Gehen Sie auf [GitHub](https://github.com) und erstellen Sie ein neues, leeres Repository (z. B. privat oder öffentlich, Name: `mieec-controller`).
2. Öffnen Sie ein Terminal (PowerShell) in diesem Ordner auf Ihrem PC und führen Sie folgende Befehle aus:

```bash
# Git initialisieren
git init

# Alle Dateien hinzufügen
git add app/ Dockerfile docker-compose.yml

# Commit erstellen
git commit -m "Initial commit for Home Server deployment"

# Repository verknüpfen (Ersetzen Sie die URL mit Ihrer GitHub-Repository-URL)
git remote add origin https://github.com/IHR-BENUTZERNAME/mieec-controller.git

# Zweig benennen und hochladen
git branch -M main
git push -u origin main
```

---

## 🚀 Schritt 2: Auf dem Home Server / VM installieren

Sobald der Code auf GitHub liegt, loggen Sie sich auf Ihrem Home Server (z. B. Ubuntu-VM, Debian, Proxmox-LXC, etc.) ein:

1. **Projekt clonen:**
   ```bash
   git clone https://github.com/IHR-BENUTZERNAME/mieec-controller.git
   cd mieec-controller
   ```

2. **Mit Docker Compose starten:**
   (Stellen Sie sicher, dass `docker` und `docker-compose` auf der VM installiert sind.)
   ```bash
   docker-compose up -d --build
   ```
   *Die App läuft nun im Container und ist auf Port **`8080`** der VM erreichbar (z.B. `http://<IP-der-VM>:8080`).*

---

## 🔒 Schritt 3: HTTPS einrichten (Zwingend für Bluetooth!)

Da die Web-Bluetooth-API auf mobilen Browsern wie *Bluefy* aus Sicherheitsgründen zwingend **HTTPS (SSL)** voraussetzt, müssen Sie die App über eine sichere HTTPS-Adresse aufrufen. Hier sind die drei besten Methoden für Home Server:

### Methode A: Cloudflare Tunnel (Empfohlen & am einfachsten)
Wenn Sie eine eigene Domain haben, können Sie einen kostenlosen Cloudflare Tunnel installieren:
1. Erstellen Sie einen Cloudflare Tunnel in Ihrem Cloudflare Dashboard.
2. Lassen Sie den Tunnel auf Ihrer VM auf `http://localhost:8080` zeigen.
3. Cloudflare stellt Ihnen automatisch ein offizielles, weltweit gültiges HTTPS-Zertifikat bereit.

### Methode B: Nginx Proxy Manager (Klassisch)
Wenn Sie bereits einen Reverse Proxy (wie Nginx Proxy Manager) auf Ihrem Home Server betreiben:
1. Erstellen Sie einen neuen Proxy Host, der auf die IP Ihrer VM und Port `8080` zeigt.
2. Generieren Sie ein kostenloses Let's Encrypt SSL-Zertifikat über die Benutzeroberfläche.

### Methode C: Tailscale mit HTTPS (Sehr sicher)
Wenn Sie Tailscale für Ihr Heimnetzwerk nutzen:
1. Aktivieren Sie HTTPS in Ihren Tailscale-Einstellungen.
2. Führen Sie auf der VM `tailscale cert` aus, um ein gültiges Zertifikat für Ihren VM-Namen zu generieren.
3. Richten Sie Nginx auf der VM so ein, dass er dieses Zertifikat nutzt.
