BIN = ./node_modules/.bin
BLDR = ${BIN}/bldr
STYLUS = ${BIN}/stylus

title="Clii - A simple command line interface utility"

docs:

	@mkdir -p ./docs/{public,src}
	@echo "title: ${title}\n\n---\n\n" > ./docs/src/index.md
	@cat ./README.md >> ./docs/src/index.md
	
	@${BLDR} \
		--source docs/src/ \
		--dest docs/public/ \
		--views docs/views/
	
	@${STYLUS} \
		./docs/style.styl \
		--out ./docs/public \
		--use ./node_modules/nib/lib/nib

docs-clean:
	@rm -rf ./docs/{public,src}

test:
	@$(BIN)/mocha

.PHONY: test docs
