.PHONY : lint format clean

all: format lint

format:
	yarn format

lint:
	yarn lint

clean:
	rm -rf build *.log
