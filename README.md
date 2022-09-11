# Imasse Browser Extension

Imasse is a free search engine and ad free citation generator that makes research easier than ever before. Create instant MLA & APA citations just by clicking the Imasse icon in the top right or find awesome sources to cite by searching the web from your new tab page.

![GitHub manifest version](https://img.shields.io/github/manifest-json/v/imasse-dev/imasse-extension.svg?style=flat-square) 

Imasse's Browser Extension is distributed under the Mozilla Public License 2.0 [License](LICENSE)

## Features
- Launches Imasse on new tab load
  - Top Sites
  - Apps Menu
  - Settings
    - Citation format
    - School selection
- Changes users default search engine to Imasse
- Instant MLA & APA citations 
  - By clicking extension icon 
- View credibility for any website
  - By right clicking on any link 
    -  For example in search results 

## Latest Version

The lastest version can be downloaded from the Chrome Web Store located [here](https://www.imasse.com/download)

## Development

Steps to begin contributing to Imasse's Browser Extension

- Fork this GitHub Repoistory (make sure you keep this fork up to date with the main branch)
- Download your forked code a zip Folder
- Extract zip folder 
- On Chrome naviage to chrome://extensions
  - Make sure you are in developer mode (located in top right)
- Select load unpacked and select your extension folder that you extracted from the zip file
- Open folder in your favorite code editor and begin testing

Once done be sure to upload your code to your GitHub repository you forked and submit a pull request to the main-dev branch

## API endpoints
Citation api: https://api.imasse.com/citations/search?q={encoded url}

Credibility api: https://api.imasse.com/credibility/search?q={encoded url}

Available schools list: https://cdn.imasse.com/api/classroom.json

Tile ads: https://cdn.imasse.com/api/tiles.json

## Reporting a broken site

Report any broken sites to support@imasse.com

## Reporting bugs

For any bugs found on the Imasse Browser Extension please create a new issue [here](https://github.com/imasse-dev/imasse-extension/issues)

## Questions or help with the search engine
If you have any questions about our search engine please see our [help pages](https://www.imasse.com/faq)
