#!/bin/bash
# Script to create .env file from environment variables

cat <<EOF > .env.production
API_KEY=$API_KEY_PRO
GATSBY_APP_ID=$GATSBY_APP_ID_PRO
EOF
