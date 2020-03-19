#!/bin/bash

TAG=$1
INDABOX_SERVER="docker.pkg.github.com/car12o/indabox/indabox-server"
INDABOX_CLIENT="docker.pkg.github.com/car12o/indabox/indabox-client"
DIR="/root/indabox"

log() {
    echo "--> $1"
}

if [ -z "$TAG" ]
then
    log "Error: missing TAG argument [ ./deploy.sh {TAG} ]"
    exit 1
fi

log "Building docker images"
export TAG=$TAG
export REACT_APP_API_URL="https://associados.sppsm.org/api"
docker-compose build

log "Pruning docker images"
docker rmi $(docker images | grep none)

log "Pushing docker images"
docker push $INDABOX_SERVER:$TAG
docker push $INDABOX_CLIENT:$TAG

log "Copying docker-compose.yaml"
scp docker-compose.yaml root@193.70.43.66:$DIR/docker-compose.yaml

log "Pulling images"
ssh -o "StrictHostKeyChecking no" root@193.70.43.66 "export TAG=$TAG && docker-compose -f $DIR/docker-compose.yaml pull"

log "Stopping services"
ssh -o "StrictHostKeyChecking no" root@193.70.43.66 "export TAG=$TAG && docker-compose -f $DIR/docker-compose.yaml down"

log "Starting services"
ssh -o "StrictHostKeyChecking no" root@193.70.43.66 "export TAG=$TAG && docker-compose -f $DIR/docker-compose.yaml up -d"

log "Services status"
ssh -o "StrictHostKeyChecking no" root@193.70.43.66 "docker ps -a"
