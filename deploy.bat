ssh pi@192.168.178.12 rm -rf /var/www/league/*
cd dist/app
tar -zcvf dist.tar.gz .
scp -rp dist.tar.gz pi@192.168.178.12:/var/www/league
ssh pi@192.168.178.12 tar -zxf /var/www/league/dist.tar.gz -C /var/www/league
ssh pi@192.168.178.12 rm -f /var/www/league/dist.tar.gz
cd ../..
rm -f dist.tar.gz
