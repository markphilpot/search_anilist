.PHONY : lint format

all: format lint

format:
	yarn format

lint:
	yarn lint
