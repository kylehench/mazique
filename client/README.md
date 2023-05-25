# Deployment - update client
Navigate to `/mazique/client`
```
git pull
npm run build
```
Replace previous build and restart Nginx:
```
sudo rm -rf /var/www/html
sudo mv dist /var/www/html
sudo service nginx restart
```