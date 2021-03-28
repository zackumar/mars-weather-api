import express from 'express'
import puppeteer from 'puppeteer'

const app = express()
const port = process.env.PORT || 3271

app.all('/', (req, res) => {
    res.json('Mars Weather')
})

let weatherMock = {
    date: '2021-03-18',
    sol: 3062,
    max_c: -15,
    min_c: -73,
    pressure: 838,
    atm_opacity: 'Sunny',
    uv: 'moderate',
    sunrise: '06:31',
    sunset: '18:25',
    location: 'Elysium Planitia',
}

app.get('/mars', async (req, res) => {
    console.log('Starting')
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://cab.inta-csic.es/rems/marsweather.html')

    console.log('waiting')
    await page.waitForTimeout(2000)

    console.log('done waiting')

    let date = await page.$('[id=mw-terrestrial_date]')
    let sol = await page.$('[id=mw-sol]')
    let max = await page.$('[id=mw-max_temp]')
    let min = await page.$('[id=mw-min_temp]')
    let pressure = await page.$('[id=mw-pressure]')
    let atmOpacity = await page.$('[id=mw-atmo_opacity]')
    let uv = await page.$('span[title^="UV Radiation level"]')
    let sunrise = await page.$('[id=mw-sunrise]')
    let sunset = await page.$('[id=mw-sunset]')

    let weatherInfo = {
        date: await getText(page, date),
        sol: parseInt(await getText(page, sol)),
        max_c: parseInt(await getText(page, max)),
        min_c: parseInt(await getText(page, min)),
        pressure: parseInt(await getText(page, pressure)),
        atm_opacity: await getText(page, atmOpacity),
        uv: await getText(page, uv),
        sunrise: await getText(page, sunrise),
        sunset: await getText(page, sunset),
    }

    res.json(weatherInfo)
})

async function getText(page: puppeteer.Page, element: puppeteer.ElementHandle | null): Promise<string> {
    if (element == null) return '-1'
    return await page.evaluate((el) => el.textContent, element)
}

const server = app.listen(port, () => {
    console.log(`Server listening at on port ${port}`)
})
