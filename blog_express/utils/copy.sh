#!/bin/sh
cd /Users/liqiankun/VSCodeProject/nodelearn/blog_1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log