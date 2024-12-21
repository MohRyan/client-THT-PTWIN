import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'
import { Separator } from '../ui/separator'

const Support = ['Forum support', "Help Center", "Live chat", "How it works", "Security", "Privacy", "Charges logs"]
const Company = ["Community Blog", "Jobs and Careers", "Contact Us", "Our Awards", "Agencies"]
const Services = ['Tour Guide', "Tour Booking", "Hotel Booking", "Ticket Booking", "Rental Services"]
const Legal = ['Terms of Service', "Privacy Policy", "Cookies Policy", "Data Processing", "Data Policy", "Refund Policy"]

const Footer = () => {
  return (
    <footer className='mt-10 bg-gray-200 rounded-t-lg min-h-96'>
      <div className="container p-10">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <a href={'#header'} className="text-4xl pacifico">MyStore</a>
          </div>
          <b className='flex items-center gap-2'>
            <Phone />
            <p>Need help? Call us</p>
            <span className='text-2xl text-orange-400'>+62 853545343</span>
          </b>
        </div>
        <Separator className='my-5' />
        <div className="grid grid-cols-6">
          <div className="flex flex-col justify-between h-full col-span-2 gap-2">
            <ul className='flex flex-col gap-4'>
              <b className='text-xl'>Contact Us</b>
              <li className='flex items-center gap-2'><MapPin /> 12345 Ciputat. South Tangerang.</li>
              <li className='flex items-center gap-2'><Clock /> Hours: 8:00 - 17:00, Mon - Sat</li>
              <li className='flex items-center gap-2'><Mail /> ryanmoh735@gmail.com</li>
            </ul>
            <div className='flex flex-col gap-4 mt-10'>
              <b className='text-xl'>Follow us</b>
              <ul className='flex items-center gap-3'>
                <li className='flex items-center gap-2'><Instagram /></li>
                <li className='flex items-center gap-2'><Facebook /></li>
                <li className='flex items-center gap-2'><Twitter /></li>
                <li className='flex items-center gap-2'><Youtube /></li>
              </ul>
            </div>

          </div>
          <div className="flex flex-col col-span-1 gap-2">
            <b className='text-xl'>Support</b>
            <ul className='space-y-3 text-gray-400'>
              {Support.map((item, index) => (<li key={index}>{item}</li>))}
            </ul>
          </div>
          <div className="flex flex-col col-span-1 gap-2">
            <b className='text-xl'>About Us</b>
            <ul className='space-y-3 text-gray-400'>
              {Company.map((item, index) => (<li key={index}>{item}</li>))}
            </ul>
          </div>
          <div className="flex flex-col col-span-1 gap-2">
            <b className='text-xl'>Service</b>
            <ul className='space-y-3 text-gray-400'>
              {Services.map((item, index) => (<li key={index}>{item}</li>))}
            </ul>
          </div>
          <div className="flex flex-col col-span-1 gap-2">
            <b className='text-xl'>Security</b>
            <ul className='space-y-3 text-gray-400'>
              {Legal.map((item, index) => (<li key={index}>{item}</li>))}
            </ul>
          </div>
        </div>
        <Separator className='my-5' />
        <div className="flex justify-between">
          <p>© 2024 MyStore Inc. All rights reserved.</p>
          <ul className="flex gap-8 text-gray-400 pr-14">
            <li>Terms</li>
            <li>Privacy policy</li>
            <li>Legal notice</li>
            <li>Accessibilty</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
