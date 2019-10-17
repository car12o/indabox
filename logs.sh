#!/bin/bash

ssh -o "StrictHostKeyChecking no" root@193.70.43.66 "docker-compose -f /root/indabox/docker-compose.yaml logs -f"
