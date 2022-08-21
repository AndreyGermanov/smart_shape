#!/bin/bash
git push origin main
ssh root@test.germanov.dev "cd /var/www/code/smart_shape/;git pull origin main"
