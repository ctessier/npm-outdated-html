#!/usr/bin/env node

const program = require('commander')
const updateNotifier = require('update-notifier')
const fs = require('fs-extra')

const reporter = require('./lib/reporter')
const pkg = require('./package.json')

updateNotifier({ pkg }).notify()

let stdin = ''

program
  .version(pkg.version)
  .option('-o, --output [output]', 'output file')
  .option('-i, --input [input]', 'input file')
  .option(
    '-c, --theme [theme name]',
    'template theme `dark` or `light` (defaults to `light`)'
  )
  .option('-t, --template [handlebars file]', 'handlebars template file')
  .action(async (cmd, env) => {
    try {
      let data
      if (cmd.input) {
        data = await fs.readJson(cmd.input)
      } else if (stdin) {
        data = JSON.parse(stdin)
      } else {
        console.log('No input')
        return process.exit(1)
      }

      await genReport(data, cmd.output, cmd.template, cmd.theme)
    } catch (err) {
      console.error('Failed to parse NPM Outdated JSON!')
      return process.exit(1)
    }
  })

const genReport = async (
  data,
  output = 'npm-outdated.html',
  template,
  theme = 'light'
) => {
  try {
    if (!data) {
      console.log('No JSON')
      return process.exit(1)
    }

    const templateFile = template || `${__dirname}/templates/template.hbs`

    await reporter(data, templateFile, output, theme)

    console.log(`Outdated dependencies snapshot saved at ${output}`)
    process.exit(0)
  } catch (err) {
    console.log('An error occurred!')
    console.log(err)
    process.exit(1)
  }
}

if (process.stdin.isTTY) {
  program.parse(process.argv)
} else {
  process.stdin.on('readable', function () {
    const chunk = this.read()
    if (chunk !== null) {
      stdin += chunk
    }
  })
  process.stdin.on('end', function () {
    program.parse(process.argv)
  })
}
