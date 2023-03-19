#!/bin/bash
npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"

yarn build

npm publish
