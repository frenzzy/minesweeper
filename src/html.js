import { h } from 'hyperapp'
import * as app from './app'
import assets from './assets.json'
import manifest from '../public/site.webmanifest'
import icon from '../public/icon.png'
import favicon from '../public/favicon.ico'

const styles = assets['app.css']
const script = assets['app.js']
const Fragment = ''

export const { state } = app

export const { actions } = app

export const view = () => (
  <Fragment>
    <Fragment innerHTML="<!doctype html>" />
    <html lang="en" prefix="og: http://ogp.me/ns#">
      <head>
        <meta charset="utf-8" />
        <title>Minesweeper</title>
        <meta
          name="description"
          content="A free, online minesweeper game written in javascript with open source"
        />
        <meta name="keywords" content="minesweeper, game, online, free, javascript, open source" />
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <meta name="theme-color" content="#c0c0c0" />
        <meta property="og:title" content="Minesweeper" />
        <meta property="og:description" content="A free, online minesweeper game written in javascript with open source" />
        <meta property="og:url" content="https://frenzzy.github.io/minesweeper/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://frenzzy.github.io/minesweeper/minesweeper.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Minesweeper" />
        <link rel="manifest" href={manifest} />
        <link rel="apple-touch-icon" href={icon} />
        <link rel="shortcut icon" href={favicon} />
        {styles && <link rel="stylesheet" href={styles} />}
        <script
          innerHTML={
            `dataLayer=[];function gtag(){dataLayer.push(arguments)}` +
            `gtag('js',new Date());gtag('config','UA-131736543-1');`
          }
        />
        {script && <script src={script} defer />}
        {!module.hot && (
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-131736543-1" />
        )}
      </head>
      <body>
        <div id="app">
          <main />
        </div>
      </body>
    </html>
  </Fragment>
)
