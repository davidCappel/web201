import { useState } from 'react'
import './App.css'
import Card from './Card'
import kyimg from './shoepics/kyrie.jpeg'
import brown from './shoepics/brown.webp'
import lebron from './shoepics/lebron.png'
import curry from './shoepics/curry.avif'
import kobe from './shoepics/kobe.png'
import harden from './shoepics/harden.webp'
import luka from './shoepics/luka.png'
import tatum from './shoepics/tatum.png'
import iverson from './shoepics/iverson.webp'
import jordan from './shoepics/flujordan.png'


function App() {

  return (
    <>
      <main className='main'>
        <div className='heading'>
          Sneaker Spaces
         </div>
        <div className='cards'>
          <div className='lilc'>
            <Card name={"Kyrie Irving"} loc = {"https://anta.com/products/mens-anta-kai-1-sacred-bond?variant=50793700589859"} img = {kyimg}></Card>
            <Card name={"Stephen Curry"} loc = {"https://www.underarmour.com/en-us/p/curry_brand_shoes_and_gear/unisex_curry_12_gravity_basketball_shoes/3027629.html?dwvar_3027629_color=100"} img = {curry}></Card>
            <Card name={"Lebron James"} loc = {"https://www.nike.com/t/lebron-xxii-mogul-basketball-shoes-aNB6tabQ/HV8454-100"} img = {lebron}></Card>
            <Card name={"Kobe Bryant"} loc = {"https://www.nike.com/t/kobe-viii-protro-basketball-shoes-XhT44Q/HF9550-002"} img = {kobe}></Card>
            <Card name={"James Harden"} loc = {"https://www.adidas.com/us/harden-volume-9-shoes/JR2506.html"} img = {harden}></Card>
            <Card name={"Luka Doncic"} loc = {"https://www.nike.com/t/luka-3-basketball-shoes-R7hgWx/FQ1284-500"} img = {luka}></Card>
            <Card name={"Jaylen Brown"} loc = {"https://preorder.741performance.com/collections/footwear"} img = {brown}></Card>
            <Card name={"Jason Tatum"} loc = {"https://www.nike.com/t/tatum-3-basketball-shoes-nYWcchIm/HV5882-100"} img = {tatum}></Card>
            <Card name={"Allen Iverson"} loc = {"https://www.reebok.com/collections/allen-iverson/products/reebok-question-mid-shoes-white-salted-caramel-white-107738"} img = {iverson}></Card>
            <Card name={"Michael Jordan"} loc = {"https://www.nike.com/t/air-jordan-12-retro-black-and-varsity-red-mens-shoes-mmrpJt/CT8013-002"} img = {jordan}></Card>
            
          </div>
          
          
        </div>
      </main>
    </>
  )
}

export default App
