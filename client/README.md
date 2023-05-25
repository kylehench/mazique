# Deployment - update client
```
cd [/mazique/client folder]
```
```
git pull
npm run build
sudo rm -rf /var/www/html
sudo mv dist /var/www/html
sudo service nginx restart
```