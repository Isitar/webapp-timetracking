#!/bin/bash
docker build -t isitar/webapp-timetracking -f Dockerfile .

docker push isitar/webapp-timetracking

