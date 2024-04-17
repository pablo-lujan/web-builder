#!/bin/bash
git pull
current_datetime=$(date)
commit_message="Automatic commit on $current_datetime, new version of the site was generated"
git add .
git commit -m "$commit_message"
git push -u origin react-bricks
