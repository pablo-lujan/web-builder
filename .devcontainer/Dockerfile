# Use an official Node runtime as a parent image based on Debian Bullseye
FROM node:20-bullseye-slim

# If you need to install additional OS packages, do it here
RUN apt-get update && apt-get install -y \
    git \
    ca-certificates \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# [Optional] Uncomment this section to install additional packages.
RUN apt-get update && apt-get install -y sudo

RUN echo "node:node"|chpasswd
# Avoid running as root permanently
USER node

# Set the working directory
WORKDIR /home/node

# Set the specific version of Node.js
ENV NODE_VERSION=20.12.2

# Set the specific version of Yarn
ENV YARN_VERSION=1.22.19

# Install Yarn at the specified version
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version $YARN_VERSION

# Ensure that Yarn is in the PATH
ENV PATH="/home/node/.yarn/bin:/home/node/.config/yarn/global/node_modules/.bin:${PATH}"

# Set the default shell to bash instead of sh
SHELL ["/bin/bash", "-c"]
