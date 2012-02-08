test: test-unit

test-unit:
	@./node_modules/mocha/bin/mocha

PHONY: all test