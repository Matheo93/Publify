#!/bin/bash
docker run -d -p 3000:3000 --env-file /home/ubuntu/Publify/.env --restart always 626635439764.dkr.ecr.eu-north-1.amazonaws.com/publify:latest
