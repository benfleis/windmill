#!/bin/sh

cd ~/src/windmill && \
    rsync -avP --delete --exclude '.*.swp' --exclude 'tm/examples/*' --exclude 'tm/senchalearn/*' --exclude 'tm/third-party/touch-2.1.1/examples/*' tm monkey.org:public/html
