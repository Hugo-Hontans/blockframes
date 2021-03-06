#! /usr/bin/env bash
set -x
set -e

export NODE_OPTIONS="--max_old_space_size=8192"

git checkout demo
TAG="demo-$(date +'%Y%m%d%H%M')"

for i in {1..5}; do
  echo $i
  export ENV=production

  cp ./env/demo/env.demo${i}.ts ./env/env.ts
  cp ./env/demo/env.demo${i}.ts ./env/env.prod.ts

  npm run build:all

  firebase use demo${i}

  # we deploy everything but functions, they tend to crash
  firebase deploy --except functions

  # we deploy the functions and retry until it worked
  until firebase deploy --only functions; do
    echo retry
    sleep 5
  done

  scp -r dist/apps/* blockframes:~/www/www-data/demo${i}/
done

git tag "${TAG}"
git push origin "${TAG}"
