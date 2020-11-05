const Handlebars = require('handlebars')
const moment = require('moment')
const fs = require('fs-extra')
const chalk = require('chalk')

const generateTemplate = async (data, template) => {
  const htmlTemplate = await fs.readFile(template, 'utf8')
  return Handlebars.compile(htmlTemplate)(data)
}

const writeReport = async (report, output) => {
  await fs.ensureFile(output)
  await fs.writeFile(output, report)
}

const modifyData = async data => {
  const count = {
    total: 0,
    dependencies: 0,
    devDependencies: 0
  }
  const modifiedData = { dependencies: [] }

  Object.keys(data).forEach(name => {
    count.total += 1
    count[data[name].type] += 1
    modifiedData.dependencies.push({ ...data[name], name })
  })

  modifiedData.count = count
  modifiedData.date = Date.now()

  return modifiedData
}

module.exports = async (data, templateFile, outputFile, theme) => {
  try {
    if (Object.keys(data).length > 0 && !data[Object.keys(data)[0]].type) {
      console.log(
        chalk.red(
          `The provided data doesn't seem to be correct. Did you run with ${chalk.underline(
            'npm outdated --long --json'
          )}?`
        )
      )
      process.exit(1)
    }

    const modifiedData = await modifyData(data)
    modifiedData.theme = theme
    const report = await generateTemplate(modifiedData, templateFile)
    await writeReport(report, outputFile)
  } catch (err) {
    console.log(err)
  }
}

Handlebars.registerHelper('moment', (date, format) =>
  moment.utc(date).format(format)
)

Handlebars.registerHelper('if_eq', (a, b, opts) => {
  if (a === b) {
    return opts.fn(this)
  } else {
    return opts.inverse(this)
  }
})
