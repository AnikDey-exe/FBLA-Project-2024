import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import ImportBS from './importBS';

import { Inter, Poppins, Merriweather, Prata } from 'next/font/google'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Head from 'next/head';
import Script from 'next/script';

import UserContext from './contexts/UserContext'

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})
const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900']
})
const prata = Prata({
  subsets: ['latin'],
  weight: ['400']
})

export const metadata = {
  title: 'ExpressEats',
  description: 'The food delivery platform of tomorrow',
}

// handles the layout of the website
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <Head>
        <script async src="https://api.cronbot.ai/v1/widgets/app/app_9v76zrj2mbiw"/>
        <noscript>You need to <a href="https://www.chatbot.com/help/chat-widget/enable-javascript-in-your-browser/" rel="noopener nofollow">enable JavaScript</a> in order to use the AI chatbot tool powered by <a href="https://www.chatbot.com/" rel="noopener nofollow" target="_blank">ChatBot</a></noscript>
      </Head> */}
      <body className={merriweather.className}>
        <UserContext>
          <ImportBS />
          <Navbar />
          <div
            style={{
              flexGrow: 1
            }}
          >
            {children}
          </div>
          <Footer />
        </UserContext>
        {/* <Script
        id="cronbot"
        async
        src="https://api.cronbot.ai/v1/widgets/app/app_9v76zrj2mbiw"/> */}
        <Script id="chatbot" src="./chatbot.js"/>
        <Script id="chatbase"
          src="https://www.chatbase.co/embed.min.js"
          chatbotId="dr3qaVdEvooGK7ow26Hl4"
          domain="www.chatbase.co"
          defer>
        </Script>
      </body>
    </html>
  )
}
