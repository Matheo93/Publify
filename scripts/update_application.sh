#!/bin/bash
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 626635439764.dkr.ecr.eu-north-1.amazonaws.com
docker pull 626635439764.dkr.ecr.eu-north-1.amazonaws.com/publify:latest
