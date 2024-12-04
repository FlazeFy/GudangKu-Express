import * as puppeteer from "puppeteer";
import fs from 'fs';
import path from 'path';

export const generatePDF = async (htmlContent: string, outputPath: string): Promise<void> => {
    const dir = path.dirname(outputPath)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })
    await page.pdf({ path: outputPath, format: "A4" })

    await browser.close()
};
