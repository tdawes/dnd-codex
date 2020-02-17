SHELL := bash -e -u -o pipefail

GOOGLE_CLOUD_PROJECT ?= $(shell firebase use)
export GOOGLE_CLOUD_PROJECT
$(info GOOGLE_CLOUD_PROJECT = $(GOOGLE_CLOUD_PROJECT))

ROOT := $(realpath .)
FIREBASE := $(ROOT)/node_modules/.bin/firebase

.PHONY: connect
connect: 
	$(FIREBASE) use '$(GOOGLE_CLOUD_PROJECT)'
