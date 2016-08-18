SET /P username=Please enter username:
call grunt build
cd dist
scp client.zip %username%@analyzed.gg:work/docker/deploy/
cd ..
ssh %username%@analyzed.gg 'work/docker/deploy/deploy.sh'