#!/bin/bash
# Script to create .env file from environment variables

cat <<EOF > .env.development
API_KEY=$API_KEY_DEV
GATSBY_APP_ID=$GATSBY_APP_ID_DEV
EOF
