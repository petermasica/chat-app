#!/bin/bash

docker-compose -f docker-compose.dev.yml down && docker-compose -f docker-compose.dev.yml up --build -d
cd client && yarn && yarn start
