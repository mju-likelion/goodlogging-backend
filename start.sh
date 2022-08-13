export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"  # This loads nvm bash_completion**
~/.nvm/versions/node/v16.16.0/bin/yarn install
~/.nvm/versions/node/v16.16.0/bin/npm install pm2 -g
~/.nvm/versions/node/v16.16.0/bin/pm2 start npm -- run start --prefix goodlogging-backend
