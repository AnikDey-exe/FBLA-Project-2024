import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import ImportBS from './importBS';

import { Inter, Poppins } from 'next/font/google'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Head from 'next/head'

import UserContext from './contexts/UserContext'

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

// handles the layout of the website
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
        />
      </Head> */}
      <body className={poppins.className}>
        <UserContext>
          <ImportBS />
          <Navbar />
          <div style={{
            paddingBottom: 400
          }}>
            {children}
          </div>
          <Footer />
        </UserContext>
      </body>
    </html>
  )
}
